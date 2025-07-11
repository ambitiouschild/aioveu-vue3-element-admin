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
                    >
                      <template #default="scope">
                        <DictLabel v-model="scope.row.gender" code="gender"/>
                      </template>

                    </el-table-column>
                    <el-table-column
                       key="age"
                       label="会员年龄"
                       prop="age"
                       width="150"
                       align="center"
                    />

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
      <el-form ref="dataFormRef" :model="formData" :rules="formRules" label-width="100px">
               <!-- 会员编号 - 仅在编辑模式显示 -->
        <!--   <el-form-item label="会员编号" prop="id">
                 <el-input
                     v-model="formData.id"
                     placeholder="会员编号"
                 />
           </el-form-item>
        -->
           <!-- 会员姓名 -->
                <el-form-item label="会员姓名" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="请输入会员姓名"
                          clearable
                      />
                </el-form-item>

                <!-- 会员手机号 -->
                <el-form-item label="会员手机号" prop="mobile">
                      <el-input
                          v-model="formData.mobile"
                          placeholder="请输入11位会员手机号"
                          maxlength="11"
                          clearable
                      >
                        <template #prefix>
                          <i class="el-icon-phone"></i>
                        </template>
                      </el-input>
                </el-form-item>

                <!-- 性别 -->
                <el-form-item label="性别" prop="gender">
                      <Dict  v-model="formData.gender" code="gender" />
                </el-form-item>

                <!-- 会员年龄 -->
                <el-form-item label="会员年龄" prop="age">
                  <el-input-number
                    v-model="formData.age"
                    :min="0"
                    :max="150"
                    placeholder="请输入年龄"
                    controls-position="right"
                  />
                </el-form-item>

                <!-- 创建时间 - 仅在编辑模式显示 -->
                <el-form-item  label="创建时间" prop="createTime">
                      <el-date-picker
                          v-model="formData.createTime"
                          type="datetime"
                          placeholder="创建时间"
                          format="YYYY-MM-DD HH:mm"
                          value-format="YYYY-MM-DDTHH:mm:ssZ"
                          disabled
                      />
                </el-form-item>

        <!-- 更新时间 - 仅在编辑模式显示 -->
                <el-form-item  label="更新时间" prop="updateTime">
                      <el-date-picker
                          v-model="formData.updateTime"
                          type="datetime"
                          placeholder="更新时间"
                          format="YYYY-MM-DD HH:mm"
                          value-format="YYYY-MM-DDTHH:mm:ssZ"
                          disabled
                      />
                </el-form-item>

                <!-- 是否删除 - 仅在编辑模式显示 -->
                <el-form-item label="是否删除(1:已删除;0:未删除)" prop="isDeleted">
                  <el-tag :type="formData.isDeleted ? 'danger' : 'success'">
                    {{ formData.isDeleted ? '已删除' : '正常' }}
                  </el-tag>
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

  // 添加类型导入
  import type { FormRules } from 'element-plus'

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

  // 会员信息表单校验规则 表单验证规则
  const formRules  = reactive<FormRules>({
    name: [
      { required: true, message: '请输入会员姓名', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '请输入手机号码', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
    ],
    age: [
      { type: 'number', min: 0, max: 150, message: '年龄在0-150之间', trigger: 'blur' }
    ],
    gender: [
      { required: true, message: '请选择性别', trigger: 'change' }
    ]
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
          // 更新操作
                MemberAPI.update(id, formData)
              .then(() => {
                ElMessage.success("会员信息修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .catch(error => {
                // 根据错误类型显示不同消息
                if (error?.response?.status === 404) {
                  ElMessage.error("会员不存在或已被删除");
                } else {
                  ElMessage.error("更新失败：" + (error.message || "请稍后重试"));
                }
              })
              .finally(() => (loading.value = false));
        } else {
          // 新增操作
                MemberAPI.add(formData)
              .then(() => {
                ElMessage.success("会员新增成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .catch(error => {
                // 处理可能的手机号重复等错误
                if (error?.response?.data?.code === 1001) {
                  ElMessage.error("手机号已存在");
                } else {
                  ElMessage.error("创建失败：" + (error.message || "请稍后重试"));
                }
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
