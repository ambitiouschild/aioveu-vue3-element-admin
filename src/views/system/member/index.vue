<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <template #icon><Search /></template>
            搜索
          </el-button>
          <el-button @click="handleResetQuery">
            <template #icon><Refresh /></template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="mb-10px">
        <el-button
            v-hasPerm="['system:member:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['system:member:delete']"
            type="danger"
            :disabled="removeIds.length === 0"
            @click="handleDelete()"
        >
          <template #icon><Delete /></template>
          删除
        </el-button>
      </div>

      <el-table
          ref="dataTableRef"
          v-loading="loading"
          :data="pageData"
          highlight-current-row
          border
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
                    <el-table-column
                        key="id"
                        label="会员编号"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="name"
                        label="会员姓名"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="mobile"
                        label="会员手机号"
                        prop="mobile"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="gender"
                        label="性别"
                        prop="gender"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column label="会员年龄" width="150" align="center">
                      <template #default="scope">
                        <DictLabel v-model="scope.row.age" code="gender" />
                      </template>
                    </el-table-column>
                    <el-table-column
                        key="createTime"
                        label="创建时间"
                        prop="createTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="updateTime"
                        label="更新时间"
                        prop="updateTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="isDeleted"
                        label="是否删除(1:已删除;0:未删除)"
                        prop="isDeleted"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['system:member:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['system:member:delete']"
                type="danger"
                size="small"
                link
                @click="handleDelete(scope.row.id)"
            >
              <template #icon><Delete /></template>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
          v-if="total > 0"
          v-model:total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="handleQuery()"
      />
    </el-card>

    <!-- 会员信息表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="会员编号" prop="id">
                      <el-input
                          v-model="formData.id"
                          placeholder="会员编号"
                      />
                </el-form-item>

                <el-form-item label="会员姓名" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="会员姓名"
                      />
                </el-form-item>

                <el-form-item label="会员手机号" prop="mobile">
                      <el-input
                          v-model="formData.mobile"
                          placeholder="会员手机号"
                      />
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                      <el-input
                          v-model="formData.gender"
                          placeholder="性别"
                      />
                </el-form-item>

                <el-form-item label="会员年龄" prop="age">
                          <dict v-model="formData.age" code="gender" />
                </el-form-item>

                <el-form-item label="创建时间" prop="createTime">
                      <el-input
                          v-model="formData.createTime"
                          placeholder="创建时间"
                      />
                </el-form-item>

                <el-form-item label="更新时间" prop="updateTime">
                      <el-input
                          v-model="formData.updateTime"
                          placeholder="更新时间"
                      />
                </el-form-item>

                <el-form-item label="是否删除(1:已删除;0:未删除)" prop="isDeleted">
                      <el-input
                          v-model="formData.isDeleted"
                          placeholder="是否删除(1:已删除;0:未删除)"
                      />
                </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: "Member",
    inheritAttrs: false,
  });

  import MemberAPI, { MemberPageVO, MemberForm, MemberPageQuery } from "@/api/system/member";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<MemberPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 会员信息表格数据
  const pageData = ref<MemberPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 会员信息表单数据
  const formData = reactive<MemberForm>({});

  // 会员信息表单校验规则
  const rules = reactive({
                      id: [{ required: true, message: "请输入会员编号", trigger: "blur" }],
  });

  /** 查询会员信息 */
  function handleQuery() {
    loading.value = true;
          MemberAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置会员信息查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开会员信息弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改会员信息";
            MemberAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增会员信息";
    }
  }

  /** 提交会员信息表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.id;
        if (id) {
                MemberAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                MemberAPI.add(formData)
              .then(() => {
                ElMessage.success("新增成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        }
      }
    });
  }

  /** 关闭会员信息弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.id = undefined;
  }

  /** 删除会员信息 */
  function handleDelete(id?: number) {
    const ids = [id || removeIds.value].join(",");
    if (!ids) {
      ElMessage.warning("请勾选删除项");
      return;
    }

    ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(
        () => {
          loading.value = true;
                MemberAPI.deleteByIds(ids)
              .then(() => {
                ElMessage.success("删除成功");
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        },
        () => {
          ElMessage.info("已取消删除");
        }
    );
  }

  onMounted(() => {
    handleQuery();
  });
</script>
