<template>
  <div class="templates-container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <!-- 行业分类标签 -->
        <div class="category-tabs">
          <div
            v-if="industryCategories.length > 0"
            class="category-tabs-container"
          >
            <div
              v-for="category in industryCategories"
              :key="category.f_ItemId"
              class="category-tab"
              :class="{ active: currentCategory === category.f_ItemValue }"
              @click="handleCategoryChange(category.f_ItemValue)"
            >
              {{ category.f_ItemName }}
            </div>
          </div>
        </div>
      </div>
      <div class="toolbar-right">
        <a-input-search
          v-model:value="searchKeyword"
          :placeholder="$t('flow.searchTemplate')"
          style="width: 250px"
          @search="handleSearch"
          @change="handleSearchChange"
        />
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <a-spin :spinning="loading" size="large">
        <div v-if="templateList.length === 0" class="empty-state">
          <a-empty
            :description="$t('flow.noTemplates')"
            :image="Empty.PRESENTED_IMAGE_SIMPLE"
          />
        </div>

        <div v-else class="template-grid">
          <div
            v-for="template in templateList"
            :key="template.f_Id"
            class="template-card"
          >
            <div class="card-header">
              <div class="template-preview">
                <a-image
                  :src="template.f_ImgUrl || defaultImg"
                  :alt="$t('flow.templatePreview')"
                  class="preview-image"
                />
              </div>

              <div class="template-badges">
                <a-tag v-if="template.f_IsPopular" color="orange">{{ $t('flow.popular') }}</a-tag>
                <a-tag v-if="template.f_Category" color="blue">{{
                  getCategoryName(template.f_Category)
                }}</a-tag>
              </div>
            </div>

            <div class="card-content">
              <h3 class="template-title" :title="template.f_Caption">{{ template.f_Caption }}</h3>
              <p class="template-description" :title="template.f_Description">
                {{ template.f_Description || $t('flow.noDescription') }}
              </p>
            </div>

            <div class="card-footer">
              <a-button
                type="primary"
                block
                @click="handleUseTemplate(template)"
                :loading="usingTemplateId === template.f_Id"
              >
                {{ $t('flow.useTemplateButton') }}
              </a-button>
            </div>
          </div>
        </div>
      </a-spin>
    </div>

    <!-- 分页 -->
    <div class="pagination-wrapper" v-if="templateList.length > 0">
      <a-pagination
        v-model:current="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :show-size-changer="false"
        :show-quick-jumper="false"
        :show-total="
          (total, range) => `${$t('flow.range')} ${range[0]}${$t('flow.to')}${range[1]} ${$t('flow.items')}，${$t('flow.total')} ${total} ${$t('flow.items')}`
        "
        @change="handlePageChange"
        @show-size-change="handlePageSizeChange"
      />
    </div>

    <!-- 使用模板弹窗 -->
    <UseTemplateModal
      v-model:open="useTemplateModalVisible"
      :template="currentTemplate"
      @success="handleUseTemplateSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { message, Empty } from "ant-design-vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import {
  BranchesOutlined,
  EyeOutlined,
  HeartOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import * as flowCenterApi from "@/api/flowcenter";
import { awaitWrapper } from "@/api";
import { UseTemplateModal } from "../modal";
import debounce from "lodash-es/debounce";
import defaultImg from "@/assets/images/default_template.png";

const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

// 响应式数据
const loading = ref(false);
const searchKeyword = ref("");
const templateList = ref<any[]>([]);
const useTemplateModalVisible = ref(false);
const currentTemplate = ref<any>(null);
const usingTemplateId = ref("");

// 行业分类相关数据
const industryCategories = ref<any[]>([]);
const currentCategory = ref("");

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
});

// 分类名称映射
const categoryNames = {
  automation: "automation",
  data: "dataProcessing",
  ai: "aiApplication",
  business: "businessProcess",
};

// 方法
const loadIndustryCategories = async () => {
  try {
    const [err, response] = await awaitWrapper(
      flowCenterApi.getFlowIndustryCategory({
        mBIIndustryCategory: "IndustryCategory",
      })
    );

    if (err) {
      console.error("获取行业分类失败:", err);
      return;
    }

    industryCategories.value = response.data || [];
    if (industryCategories.value.length > 0) {
      currentCategory.value = industryCategories.value[0].f_ItemValue;
      // 分类加载完成并设置默认选中后，再加载模板列表
      loadTemplateList();
    }
  } catch (error) {
    console.error("获取行业分类失败:", error);
  }
};

const loadTemplateList = async () => {
  try {
    loading.value = true;

    const params = {
      mCategory: currentCategory.value,
      pageIndex: pagination.current,
      pageSize: pagination.pageSize,
      QueryField: searchKeyword.value,
    };

    const [err, response] = await awaitWrapper(
      flowCenterApi.getMarketTemplatesByCategory(params)
    );

    if (err) {
      console.error("获取模板列表失败:", err);
      return;
    }

    templateList.value = response.data?.items || [];
    pagination.total = response.data?.totalCount || 0;
  } catch (error) {
    console.error("获取模板列表失败:", error);
  } finally {
    loading.value = false;
  }
};

const debouncedLoadTemplateList = debounce(() => {
  pagination.current = 1;
  loadTemplateList();
}, 400);

const handleSearch = () => {
  pagination.current = 1;
  loadTemplateList();
};

const handleSearchChange = (e: any) => {
  searchKeyword.value = e.target.value;
  debouncedLoadTemplateList();
};

const handleCategoryChange = (category: string) => {
  currentCategory.value = category;
  pagination.current = 1;
  loadTemplateList();
};

const handlePageChange = (page: number) => {
  pagination.current = page;
  loadTemplateList();
};

const handlePageSizeChange = (current: number, size: number) => {
  pagination.current = 1;
  pagination.pageSize = size;
  loadTemplateList();
};

const handleUseTemplate = (template: any) => {
  currentTemplate.value = template;
  useTemplateModalVisible.value = true;
};

const handleUseTemplateSuccess = (flowData: any) => {
  // message.success("基于模板创建工作流成功");
  // 跳转到工作流编辑器或我的文件页面
  router.push("/flowCenter");
};

const getCategoryName = (category: string) => {
  const translationKey = categoryNames[category];
  return translationKey ? t(`flow.${translationKey}`) : category;
};

// 生命周期
onMounted(() => {
  loadIndustryCategories();
});
</script>

<style scoped lang="scss">
.templates-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;

  .toolbar-left {
    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.content-area {
  flex: 1;
  overflow: auto;
  
  .empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .template-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    padding: 8px 0;
    margin-bottom: 24px;
  }
}

.template-card {
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: fit-content;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
    transform: translateY(-2px);
  }

  .card-header {
    position: relative;
    height: 120px;
    overflow: hidden;

    .template-preview {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .preview-placeholder {
        color: #999;
        font-size: 32px;
      }
    }

    .template-badges {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      gap: 4px;
    }
  }

  .card-content {
    padding: 12px 12px 0 12px;

    .template-title {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      margin: 0 0 6px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .template-description {
      font-size: 13px;
      color: #666;
      line-height: 1.4;
      margin: 0 0 8px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 32px;
    }

    .template-stats {
      display: flex;
      gap: 12px;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #999;

        .anticon {
          font-size: 13px;
        }
      }
    }
  }

  .card-footer {
    padding: 12px;
    border-top: 1px solid #f5f5f5;
  }
}

.pagination-wrapper {
  margin-top: 24px;
  text-align: center;
}

:deep(.ant-tabs-tab) {
  font-size: 16px;
  font-weight: 500;
}

:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #1890ff;
  font-weight: 600;
}

:deep(.ant-tag) {
  margin: 0;
  border-radius: 4px;
}

.category-tabs {

  .category-tabs-container {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;

    .category-tab {
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      border: 1px solid transparent;
      background: #ffffff;
      color: #666666;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transform: translateY(0);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        background: #f8f9fa;
      }

      &.active {
        background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);

        &:hover {
          background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
        }
      }
    }
  }
}
</style>
