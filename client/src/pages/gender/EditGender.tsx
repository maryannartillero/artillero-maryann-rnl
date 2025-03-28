import MainLayout from "../layout/MainLayout";
import EditGenderForm from "../../components/forms/EditGenderForm";

const EditGender = () => {
  const content = (
    <>
      <div className="d-flex justify-content-center">
        <div className="co'-md-3">
          <EditGender />
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default EditGender;
