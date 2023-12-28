import PublicRoutes from "../../routes/PublicRoutes";

const AddNoteForm = () => {
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-4">
            <PublicRoutes/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNoteForm;
