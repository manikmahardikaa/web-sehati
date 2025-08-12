import { useRegions } from "@/app/hooks/admin/region";
import { useUsers } from "@/app/hooks/admin/user";
import { UserDataModel, UserFormModel } from "@/app/models/admin/user";
import { Role } from "@prisma/client";
import { Button, Form, Input, FormInstance, Select } from "antd";
import { useState } from "react";

export default function FormUser({
  form,
  initialValues,
  onFinish,
  loadingCreate,
  loadingUpdate,
  type,
  process,
}: {
  onFinish: (values: UserFormModel) => Promise<void>;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  initialValues?: UserFormModel;
  form: FormInstance<UserDataModel>;
  type: "create" | "update";
  process?: Role;
}) {
  const { data: regions } = useRegions({});
  const { data: users } = useUsers({});

  const [selectedAuthorityId, setSelectedAuthorityId] = useState<string>();

  const handleAuthorityChange = (authorityId: string) => {
    setSelectedAuthorityId(authorityId);
    form.setFieldsValue({ subregion_id: undefined });
  };

  const selectedAuthority = users?.find((u) => u.id === selectedAuthorityId);
  const filteredSubregions =
    regions?.find((r) => r.id === selectedAuthority?.region.id)?.subregions ??
    [];

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Nama Lengkap"
        rules={[{ required: true, message: "Nama tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan nama" size="large" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Email tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan email" size="large" />
      </Form.Item>

      {type === "create" && (
        <Form.Item
          name="password"
          label="Kata Sandi"
          rules={[{ required: true, message: "Kata sandi wajib diisi!" }]}
        >
          <Input.Password placeholder="Masukkan kata sandi" size="large" />
        </Form.Item>
      )}
      <Form.Item
        name="no_whatsapp"
        label="No Whatsapp"
        rules={[{ required: true, message: "No Whatsapp tidak boleh kosong!" }]}
      >
        <Input placeholder="Masukkan no whatsapp" size="large" />
      </Form.Item>
      {process === "PROGRAM_WILAYAH" && (
        <Form.Item
          name="region_id"
          label="Wilayah"
          rules={[{ required: true, message: "Wilayah tidak boleh kosong!" }]}
        >
          <Select>
            {regions?.map((region) => (
              <Select.Option key={region.id} value={region.id}>
                {region.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {process === "PETUGAS_LAPANGAN" && (
        <>
          <Form.Item
            name="authority_id"
            label="Penanggung Jawab"
            rules={[
              {
                required: true,
                message: "Penanggung jawab tidak boleh kosong!",
              },
            ]}
          >
            <Select
              placeholder="Pilih Penanggung Jawab"
              onChange={handleAuthorityChange}
              showSearch
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {users
                ?.filter((user) => user.role === Role.PROGRAM_WILAYAH)
                .map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subregion_id"
            label="Sub Wilayah"
            rules={[{ required: true, message: "Wilayah tidak boleh kosong!" }]}
          >
            <Select
              placeholder={
                selectedAuthority
                  ? "Pilih Sub Wilayah"
                  : "Pilih Penanggung Jawab dulu"
              }
              disabled={!selectedAuthority}
              showSearch
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {filteredSubregions.map((subregion) => (
                <Select.Option key={subregion.id} value={subregion.id}>
                  {subregion.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}

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
