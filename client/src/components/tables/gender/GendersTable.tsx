import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorHandler from "../../../handler/ErrorHandler";
import Genders from "../../../interfaces/Genders";
import GenderService from "../../../services/GenderService";
import Spinner from "../../Spinner";

interface GendersTableProps {
  refreshGenders: boolean;
}

const GendersTable = ({ refreshGenders }: GendersTableProps) => {
  const [state, setState] = useState({
    loadingGenders: true,
    genders: [] as Genders[],
  });

  const handleLoadGenders = () => {
    GenderService.loadGenders()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            genders: res.data.genders,
          }));
        } else {
          console.error(
            "Unexpected status error during loading genders: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingGenders: false,
        }));
      });
  };

  useEffect(() => {
    handleLoadGenders();
  }, [refreshGenders]);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.loadingGenders ? (
            <tr className="align-middle">
              <td colSpan={3} className="text-center">
                <Spinner />
              </td>
            </tr>
          ) : state.genders.length > 0 ? (
            state.genders.map((gender, index) => (
              <tr className="align-middle" key={index}>
                <td>{index + 1}</td>
                <td>{gender.gender}</td>
                <td>
                  <div className="btn-group">
                    <Link
                      to={`/gender/edit/${gender.gender_id}`}
                      className="btn btn-success me-2"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/gender/delete/${gender.gender_id}`}
                      className="btn btn-danger me-2"
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="align-middle">
              <td className="text-center" colSpan={3}>
                No Genders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default GendersTable;
