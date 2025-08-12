import FormPsikologiBlast from "@/app/components/common/program-wilayah/form/psikologi-blast";
import Title from "antd/es/typography/Title";

export default function PsychosocialContent () {
    return (
        <div>
            <Title level={4}>Layanan Konsultasi dan Bantuan Psikosial</Title>
            <FormPsikologiBlast/>
        </div>
    );
};