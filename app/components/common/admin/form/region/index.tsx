import { RegionDataModel, RegionFormModel } from "@/app/models/admin/region";
import {
  Button,
  Form,
  Input,
  FormInstance,
  Space,
  Divider,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function FormRegion({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
}: {
  onFinish: (values: RegionFormModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: RegionFormModel;
  form: FormInstance<RegionDataModel>;
  type: "create" | "update";
}) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Nama Wilayah"
        rules={[
          { required: true, message: "Nama wilayah tidak boleh kosong!" },
        ]}
      >
        <Input placeholder="Masukkan nama wilayah" size="large" />
      </Form.Item>

      <Divider orientation="center">Sub Wilayah</Divider>

      <Form.List name="subregions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  rules={[
                    { required: true, message: "Nama sub wilayah wajib diisi!" },
                  ]}
                >
                  <Input placeholder="Nama Sub Wilayah" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Tambah Sub Wilayah
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={type === "create" ? loadingCreate : loadingUpdate}
          size="large"
          style={{
            width: "100%",
            backgroundColor: "#C30010",
            borderColor: "#C30010",
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
