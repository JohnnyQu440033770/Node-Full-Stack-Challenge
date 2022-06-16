<template>
    <h1>Node Full Stack Challenge</h1>
    <div>
        <a-button type="primary" @click="handleAdd"
            >Add</a-button
        >
        <a-modal
            v-model:visible="visible"
            ok-text="Submit"
            cancel-text="Cancel"
            @cancel="onCancel"
            @ok="onOk"
        >
            <a-form
                ref="formRef"
                :model="formState"
                layout="vertical"
                name="form_in_modal"
            >
                <a-form-item
                    name="id"
                    label="id"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.id" />
                </a-form-item>
                <a-form-item
                    name="server_id"
                    label="server_id"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.server_id" />
                </a-form-item>
                <a-form-item
                    name="name"
                    label="name"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item
                    name="description"
                    label="description"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.description" />
                </a-form-item>
                <a-form-item
                    name="currency"
                    label="currency"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.currency" />
                </a-form-item>
                <a-form-item
                    name="type"
                    label="type"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.type" />
                </a-form-item>
                <a-form-item
                    name="digits"
                    label="digits"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.digits" />
                </a-form-item>
                <a-form-item
                    name="trade"
                    label="trade"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.trade" />
                </a-form-item>
                <a-form-item
                    name="swap_long"
                    label="swap_long"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.swap_long" />
                </a-form-item>
                <a-form-item
                    name="swap_short"
                    label="swap_short"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.swap_short" />
                </a-form-item>
                <a-form-item
                    name="contract_size"
                    label="contract_size"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="formState.contract_size" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
    <a-table :columns="columns" :data-source="dataSource" :loading="loading">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'action'">
                <a @click="handleEdit(record)">Edit </a>

                <a @click="handleDelete(record)">Delete</a>
            </template>
        </template>
    </a-table>
</template>
<script>
import { usePagination } from "vue-request";
import { defineComponent,  ref, toRaw } from "vue";
import axios from "axios";
const columns = [
    {
        title: "id",
        dataIndex: "id",
    },
    {
        title: "server_id",
        dataIndex: "server_id",
    },
    {
        title: "name",
        dataIndex: "name",
    },
    {
        title: "description",
        dataIndex: "description",
    },
    {
        title: "currency",
        dataIndex: "currency",
    },
    {
        title: "type",
        dataIndex: "type",
    },
    {
        title: "digits",
        dataIndex: "digits",
    },
    {
        title: "trade",
        dataIndex: "trade",
    },
    {
        title: "swap_long",
        dataIndex: "swap_long",
    },
    {
        title: "swap_short",
        dataIndex: "swap_short",
    },
    {
        title: "contract_size",
        dataIndex: "contract_size",
    },
    {
        title: "action",
        dataIndex: "action",
    },
];

const queryData = () => {
    return axios.get("http://localhost:8081/symbol");
};

const deleteData = (id) => {
    return axios.delete("http://localhost:8081/symbol?id=" + id);
};

const addOrEditData = (value) => {
    console.log(value)
    return axios.get("http://localhost:8081/symbol");
};

export default defineComponent({
    setup() {
        var { data: dataSource, loading } = usePagination(queryData, {
            formatResult: (res) => res.data,
        });

        const formRef = ref();
        const visible = ref(false);
        var formState = ref({})

        const handleAdd = () => {
            visible.value = true;
            const newId = dataSource.value.length==0?1:dataSource.value[dataSource.value.length-1].id+1
            formState.value = {id:newId}
        };
        
        const handleEdit = (record) => {
            const rawObject = Object.assign({}, record);
            visible.value = true;
            formState.value = rawObject
        };

        const handleDelete = (record) => {
            deleteData(record.id).then((res) => {
                dataSource.value = res.data;
            });
        };

        const onCancel = ()=>{
          formRef.value.resetFields();
        }

        const onOk = () => {
            formRef.value
                .validateFields()
                .then((values) => {
                    console.log("Received values of form: ", values);
                    console.log("formState: ", toRaw(formState));
                    visible.value = false;
                    formRef.value.resetFields();
                    addOrEditData(values).then(console.log("yes"))
                })
                .catch((info) => {
                    console.log("Validate Failed:", info);
                });
        };

        return {
            dataSource,
            columns,
            loading,
            handleDelete,
            handleEdit,
            handleAdd,
            onCancel,
            formState,
            formRef,
            visible,
            onOk,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ant-table-wrapper {
    margin: 20px;
    border: solid 3px rgb(3, 106, 153);
}
.ant-row.ant-form-item{
  margin:0;
}
.ant-col.ant-form-item-label{
  padding:0;
}
</style>
