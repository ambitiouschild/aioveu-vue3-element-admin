<template>

  <!-- 菜单管理页面容器 -->
  <div class="app-container">
    <!-- 搜索区域 -->
    <div class="search-container">

      <!-- 搜索表单 -->
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">

        <!-- 关键字搜索 -->
        <!-- 回车键触发搜索 -->
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keywords"
            placeholder="菜单名称"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <!-- 搜索按钮 -->
        <el-form-item class="search-buttons">
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格区域 -->
    <el-card shadow="hover" class="data-table">

      <!-- 表格工具栏 -->
      <div class="data-table__toolbar">
        <div class="data-table__toolbar--actions">

          <!-- 新增按钮（需要权限） -->
          <!-- 权限指令控制显示 -->
          <!-- 0表示顶级菜单 -->
          <el-button
            v-hasPerm="['sys:menu:add']"
            type="success"
            icon="plus"
            @click="handleOpenDialog('0')"
          >
            新增
          </el-button>
        </div>
      </div>

      <!-- 菜单数据表格 -->
      <!-- 加载状态 -->
      <!-- 树形表格的关键字段 -->
      <!-- 树形表格配置 -->
      <!-- 行点击事件 -->
      <el-table
        ref="dataTableRef"
        v-loading="loading"
        row-key="id"
        :data="menuTableData"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren',
        }"
        class="data-table__content"
        @row-click="handleRowClick"
      >

        <!-- 菜单名称列 -->
        <el-table-column label="菜单名称" min-width="200">
          <template #default="scope">

            <!-- 显示Element Plus图标 -->
            <template v-if="scope.row.icon && scope.row.icon.startsWith('el-icon')">
              <el-icon style="vertical-align: -0.15em">
                <component :is="scope.row.icon.replace('el-icon-', '')" />
              </el-icon>
            </template>

            <!-- 显示自定义SVG图标 -->
            <template v-else-if="scope.row.icon">
              <div :class="`i-svg:${scope.row.icon}`" />
            </template>
            {{ scope.row.name }}
          </template>
        </el-table-column>


        <!-- 菜单类型列 -->
        <el-table-column label="类型" align="center" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.type === MenuTypeEnum.CATALOG" type="warning">目录</el-tag>
            <el-tag v-if="scope.row.type === MenuTypeEnum.MENU" type="success">菜单</el-tag>
            <el-tag v-if="scope.row.type === MenuTypeEnum.BUTTON" type="danger">按钮</el-tag>
            <el-tag v-if="scope.row.type === MenuTypeEnum.EXTLINK" type="info">外链</el-tag>
          </template>
        </el-table-column>

        <!-- 其他信息列 -->
        <el-table-column label="路由名称" align="left" width="150" prop="routeName" />
        <el-table-column label="路由路径" align="left" width="150" prop="routePath" />
        <el-table-column label="组件路径" align="left" width="250" prop="component" />
        <el-table-column label="权限标识" align="center" width="200" prop="perm" />

        <!-- 状态列 -->
        <el-table-column label="状态" align="center" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.visible === 1" type="success">显示</el-tag>
            <el-tag v-else type="info">隐藏</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="排序" align="center" width="80" prop="sort" />

        <!-- 操作列 -->
        <el-table-column fixed="right" align="center" label="操作" width="220">
          <template #default="scope">

            <!-- 新增子菜单按钮（仅目录和菜单类型显示） -->
            <!-- 传递当前菜单ID作为父级 -->
            <el-button
              v-if="scope.row.type == MenuTypeEnum.CATALOG || scope.row.type == MenuTypeEnum.MENU"
              v-hasPerm="['sys:menu:add']"
              type="primary"
              link
              size="small"
              icon="plus"
              @click.stop="handleOpenDialog(scope.row.id)"
            >
              新增
            </el-button>

            <!-- 编辑按钮 -->
            <!-- 传递菜单ID进行编辑 -->
            <el-button
              v-hasPerm="['sys:menu:edit']"
              type="primary"
              link
              size="small"
              icon="edit"
              @click.stop="handleOpenDialog(undefined, scope.row.id)"
            >
              编辑
            </el-button>

            <!-- 删除按钮 -->
            <el-button
              v-hasPerm="['sys:menu:delete']"
              type="danger"
              link
              size="small"
              icon="delete"
              @click.stop="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!-- 菜单表单抽屉 -->
    <!-- 响应式尺寸 -->
    <el-drawer
      v-model="dialog.visible"
      :title="dialog.title"
      :size="drawerSize"
      @close="handleCloseDialog"
    >
      <el-form ref="menuFormRef" :model="formData" :rules="rules" label-width="100px">

        <!-- 菜单表单 -->
        <!-- 菜单树形数据 -->
        <!-- 可搜索 -->
        <!-- 严格选择模式 -->
        <!-- 点击即展开 -->
        <el-form-item label="父级菜单" prop="parentId">
          <el-tree-select
            v-model="formData.parentId"
            placeholder="选择上级菜单"
            :data="menuOptions"
            filterable
            check-strictly
            :render-after-expand="false"
          />
        </el-form-item>

        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入菜单名称" />
        </el-form-item>

        <!-- 菜单类型选择 -->
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="formData.type" @change="handleMenuTypeChange">
            <el-radio :value="MenuTypeEnum.CATALOG">目录</el-radio>
            <el-radio :value="MenuTypeEnum.MENU">菜单</el-radio>
            <el-radio :value="MenuTypeEnum.BUTTON">按钮</el-radio>
            <el-radio :value="MenuTypeEnum.EXTLINK">外链</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 外链地址（仅外链类型显示） -->
        <el-form-item v-if="formData.type == MenuTypeEnum.EXTLINK" label="外链地址" prop="path">
          <el-input v-model="formData.routePath" placeholder="请输入外链完整路径" />
        </el-form-item>

        <!-- 路由名称（仅菜单类型显示） -->
        <el-form-item v-if="formData.type == MenuTypeEnum.MENU" prop="routeName">
          <template #label>
            <div class="flex-y-center">
              路由名称
              <el-tooltip placement="bottom" effect="light">
                <template #content>
                  如果需要开启缓存，需保证页面 defineOptions 中的 name 与此处一致，建议使用驼峰。
                </template>
                <el-icon class="ml-1 cursor-pointer">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="formData.routeName" placeholder="User" />
        </el-form-item>

        <!-- 路由路径（目录和菜单类型显示） -->
        <el-form-item
          v-if="formData.type == MenuTypeEnum.CATALOG || formData.type == MenuTypeEnum.MENU"
          prop="routePath"
        >
          <template #label>
            <div class="flex-y-center">
              路由路径
              <el-tooltip placement="bottom" effect="light">
                <template #content>
                  定义应用中不同页面对应的 URL 路径，目录需以 / 开头，菜单项不用。例如：系统管理目录
                  /system，系统管理下的用户管理菜单 user。
                </template>
                <el-icon class="ml-1 cursor-pointer">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>

          <!-- 目录和菜单的路由路径格式不同 -->
          <el-input
            v-if="formData.type == MenuTypeEnum.CATALOG"
            v-model="formData.routePath"
            placeholder="system"
          />
          <el-input v-else v-model="formData.routePath" placeholder="user" />
        </el-form-item>

        <!-- 组件路径（仅菜单类型显示） -->
        <el-form-item v-if="formData.type == MenuTypeEnum.MENU" prop="component">
          <template #label>
            <div class="flex-y-center">
              组件路径
              <el-tooltip placement="bottom" effect="light">
                <template #content>
                  组件页面完整路径，相对于 src/views/，如 system/user/index，缺省后缀 .vue
                </template>
                <el-icon class="ml-1 cursor-pointer">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>

          <el-input v-model="formData.component" placeholder="system/user/index" style="width: 95%">
            <!-- 添加前后缀提示 -->
            <template v-if="formData.type == MenuTypeEnum.MENU" #prepend>src/views/</template>
            <template v-if="formData.type == MenuTypeEnum.MENU" #append>.vue</template>
          </el-input>
        </el-form-item>


        <!-- 路由参数配置（仅菜单类型显示） -->
        <el-form-item v-if="formData.type == MenuTypeEnum.MENU">
          <template #label>
            <div class="flex-y-center">
              路由参数
              <el-tooltip placement="bottom" effect="light">
                <template #content>
                  组件页面使用 `useRoute().query.参数名` 获取路由参数值。
                </template>
                <el-icon class="ml-1 cursor-pointer">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>

          <!-- 动态参数列表 -->
          <div v-if="!formData.params || formData.params.length === 0">
            <el-button type="success" plain @click="formData.params = [{ key: '', value: '' }]">
              添加路由参数
            </el-button>
          </div>

          <div v-else>
            <!-- 遍历参数项 -->
            <div v-for="(item, index) in formData.params" :key="index">
              <el-input v-model="item.key" placeholder="参数名" style="width: 100px" />

              <span class="mx-1">=</span>

              <el-input v-model="item.value" placeholder="参数值" style="width: 100px" />

              <!-- 添加按钮（仅最后一项显示） -->
              <el-icon
                v-if="formData.params.indexOf(item) === formData.params.length - 1"
                class="ml-2 cursor-pointer color-[var(--el-color-success)]"
                style="vertical-align: -0.15em"
                @click="formData.params.push({ key: '', value: '' })"
              >
                <CirclePlusFilled />
              </el-icon>

              <!-- 删除按钮 -->
              <el-icon
                class="ml-2 cursor-pointer color-[var(--el-color-danger)]"
                style="vertical-align: -0.15em"
                @click="formData.params.splice(formData.params.indexOf(item), 1)"
              >
                <DeleteFilled />
              </el-icon>
            </div>
          </div>
        </el-form-item>


        <!-- 显示状态（非按钮类型显示） -->
        <el-form-item v-if="formData.type !== MenuTypeEnum.BUTTON" prop="visible" label="显示状态">
          <el-radio-group v-model="formData.visible">
            <el-radio :value="1">显示</el-radio>
            <el-radio :value="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>


        <!-- 始终显示配置（目录和菜单类型显示） -->
        <el-form-item
          v-if="formData.type === MenuTypeEnum.CATALOG || formData.type === MenuTypeEnum.MENU"
        >
          <template #label>
            <div class="flex-y-center">
              始终显示
              <el-tooltip placement="bottom" effect="light">
                <template #content>
                  选择"是"，即使目录或菜单下只有一个子节点，也会显示父节点。
                  <br />
                  选择"否"，如果目录或菜单下只有一个子节点，则只显示该子节点，隐藏父节点。
                  <br />
                  如果是叶子节点，请选择"否"。
                </template>
                <el-icon class="ml-1 cursor-pointer">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>

          <el-radio-group v-model="formData.alwaysShow">
            <el-radio :value="1">是</el-radio>
            <el-radio :value="0">否</el-radio>
          </el-radio-group>
        </el-form-item>


        <!-- 缓存页面配置（仅菜单类型显示） -->
        <el-form-item v-if="formData.type === MenuTypeEnum.MENU" label="缓存页面">
          <el-radio-group v-model="formData.keepAlive">
            <el-radio :value="1">开启</el-radio>
            <el-radio :value="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>


        <!-- 排序 -->
        <el-form-item label="排序" prop="sort">
          <el-input-number
            v-model="formData.sort"
            style="width: 100px"
            controls-position="right"
            :min="0"
          />
        </el-form-item>

        <!-- 权限标识（仅按钮类型显示） -->
        <el-form-item v-if="formData.type == MenuTypeEnum.BUTTON" label="权限标识" prop="perm">
          <el-input v-model="formData.perm" placeholder="sys:user:add" />
        </el-form-item>

        <!-- 图标选择（非按钮类型显示） -->
        <el-form-item v-if="formData.type !== MenuTypeEnum.BUTTON" label="图标" prop="icon">
          <!-- 图标选择器 -->
          <icon-select v-model="formData.icon" />
        </el-form-item>

        <!-- 跳转路由（仅目录类型显示） -->
        <el-form-item v-if="formData.type == MenuTypeEnum.CATALOG" label="跳转路由">
          <el-input v-model="formData.redirect" placeholder="跳转路由" />
        </el-form-item>
      </el-form>

      <!-- 抽屉底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleCloseDialog">取 消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
// 导入应用状态管理
import { useAppStore } from "@/store/modules/app.store";
// 导入设备类型枚举
import { DeviceEnum } from "@/enums/settings/device.enum";

// 导入菜单相关API和类型定义
import MenuAPI, { MenuQuery, MenuForm, MenuVO } from "@/api/system/menu.api";
// 导入菜单类型枚举
import { MenuTypeEnum } from "@/enums/system/menu.enum";


// 组件选项配置
defineOptions({
  name: "SysMenu",    // 组件名称，用于keep-alive缓存
  inheritAttrs: false,  // 不继承父组件属性
});

// 使用应用状态存储
const appStore = useAppStore();


// 表单引用
const queryFormRef = ref();  // 搜索表单引用
const menuFormRef = ref();  // 菜单表单引用


// 响应式数据
const loading = ref(false);   // 加载状态
const dialog = reactive({   // 对话框状态
  title: "新增菜单",
  visible: false,
});

// 计算属性：根据设备类型设置抽屉大小
const drawerSize = computed(() => (appStore.device === DeviceEnum.DESKTOP ? "600px" : "90%"));

// 查询参数
const queryParams = reactive<MenuQuery>({});

// 菜单表格数据
const menuTableData = ref<MenuVO[]>([]);

// 菜单选项（用于父级菜单选择）
const menuOptions = ref<OptionType[]>([]);

// 初始菜单表单数据（用于重置）
const initialMenuFormData = ref<MenuForm>({
  id: undefined,
  parentId: "0",   // 默认父级为0（顶级菜单）
  visible: 1,   // 默认显示
  sort: 1,     // 默认排序
  type: MenuTypeEnum.MENU, // 默认类型为菜单
  alwaysShow: 0,   // 默认不始终显示
  keepAlive: 1,   // 默认开启缓存
  params: [],    // 路由参数数组
});
// 菜单表单数据
const formData = ref({ ...initialMenuFormData.value });

// 表单验证规则
const rules = reactive({
  parentId: [{ required: true, message: "请选择父级菜单", trigger: "blur" }],
  name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择菜单类型", trigger: "blur" }],
  routeName: [{ required: true, message: "请输入路由名称", trigger: "blur" }],
  routePath: [{ required: true, message: "请输入路由路径", trigger: "blur" }],
  component: [{ required: true, message: "请输入组件路径", trigger: "blur" }],
  visible: [{ required: true, message: "请选择显示状态", trigger: "change" }],
});

// 选择表格的行菜单ID
const selectedMenuId = ref<string | undefined>();

/**
 * 查询菜单列表
 */
function handleQuery() {
  loading.value = true;
  MenuAPI.getList(queryParams)
    .then((data) => {
      menuTableData.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 重置查询
function handleResetQuery() {
  queryFormRef.value.resetFields();   // 重置表单字段
  handleQuery();   // 重新查询
}

/**
 * 表格行点击事件
 * @param row 点击的行数据
 */
function handleRowClick(row: MenuVO) {
  selectedMenuId.value = row.id;   // 记录选中的菜单ID
}

/**
 * 打开菜单表单对话框
 * @param parentId 父菜单ID（新增时使用）
 * @param menuId 菜单ID（编辑时使用）
 */
function handleOpenDialog(parentId?: string, menuId?: string) {

  console.log("先获取菜单选项数据");
  MenuAPI.getOptions(true)
    .then((data) => {

      console.log("构建树形选择器数据，添加顶级菜单选项");
      menuOptions.value = [{ value: "0", label: "顶级菜单", children: data }];
    })
    .then(() => {
      dialog.visible = true;
      if (menuId) {

        console.log("编辑模式");

        dialog.title = "编辑菜单";
        MenuAPI.getFormData(menuId).then((data) => {

          console.log("保存初始数据用于比较");
          initialMenuFormData.value = { ...data };

          console.log("设置表单数据");
          formData.value = data;
        });
      } else {

        console.log("新增模式");

        dialog.title = "新增菜单";

        console.log("设置父级菜单ID");
        formData.value.parentId = parentId?.toString();
      }
    });
}

/**
 * 菜单类型变更处理
 * 根据菜单类型变化调整相关字段
 */
function handleMenuTypeChange() {

  console.log("如果菜单类型发生改变");
  // 如果菜单类型改变
  if (formData.value.type !== initialMenuFormData.value.type) {
    if (formData.value.type === MenuTypeEnum.MENU) {

      console.log("从目录切换到菜单时，清空组件路径");
      // 目录切换到菜单时，清空组件路径
      if (initialMenuFormData.value.type === MenuTypeEnum.CATALOG) {
        formData.value.component = "";
      } else {

        console.log("其他情况保留原有数据");
        // 其他情况，保留原有的组件路径
        formData.value.routePath = initialMenuFormData.value.routePath;
        formData.value.component = initialMenuFormData.value.component;
      }
    }
  }
}

/**
 * 提交菜单表单
 */
function handleSubmit() {

  console.log("表单验证");
  menuFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      const menuId = formData.value.id;


      if (menuId) {

        console.log("编辑模式");
        console.log("检查父级菜单不能为当前菜单（防止循环引用）");
        //修改时父级菜单不能为当前菜单
        if (formData.value.parentId == menuId) {
          ElMessage.error("父级菜单不能为当前菜单");
          return;
        }
        MenuAPI.update(menuId, formData.value).then(() => {
          ElMessage.success("修改成功");
          handleCloseDialog();
          handleQuery();   // 刷新表格
        });
      } else {

        console.log("新增模式");
        MenuAPI.create(formData.value).then(() => {
          ElMessage.success("新增成功");
          handleCloseDialog();
          handleQuery();
        });
      }
    }
  });
}

/**
 * 删除菜单
 * @param menuId 要删除的菜单ID
 */
function handleDelete(menuId: string) {
  if (!menuId) {
    ElMessage.warning("请勾选删除项");
    return false;
  }

  console.log("确认删除对话框");
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    () => {

      console.log("用户确认删除");
      loading.value = true;
      MenuAPI.deleteById(menuId)
        .then(() => {
          ElMessage.success("删除成功");
          handleQuery();
        })
        .finally(() => {
          loading.value = false;
        });
    },
    () => {

      console.log("用户取消删除");
      ElMessage.info("已取消删除");
    }
  );
}


/**
 * 重置表单
 */
function resetForm() {

  console.log("重置表单字段");
  menuFormRef.value.resetFields();

  console.log("清除验证状态");
  menuFormRef.value.clearValidate();

  console.log("重置表单数据为初始值");
  formData.value = {
    id: undefined,
    parentId: "0",
    visible: 1,
    sort: 1,
    type: MenuTypeEnum.MENU, // 默认菜单
    alwaysShow: 0,
    keepAlive: 1,
    params: [],
  };
}

// 关闭弹窗
function handleCloseDialog() {
  dialog.visible = false;
  resetForm();    // 重置表单
}


// 组件挂载后加载菜单数据
onMounted(() => {
  handleQuery();
});
</script>
