
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SuccessUpdate from './SuccessUpdate';
import SuccessDelete from './SuccessDelete';
import ErrorComponent from './ErrorComponent';

function UpdateComponent() {
  const { id } = useParams("");
  
  const [editData, setEditData] = useState({});
  const [update,setUpdate] =useState(null);
  const [deletedata,setDeletedata]=useState(false);
  const [error,setError] = useState(false);
  
  const [validationMessage,setValidationMessage]=useState();
  const [backendErrors,setBackendErrors] = useState({})


  useEffect(() => {
    getDetails();
  }, []);

  const handleupdate=()=>{
    setUpdate(false);
  }
  const handledelete=()=>{
    setDeletedata(false);
  }
  const handleError=()=>{
    setError(false);
  }
  const getDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/get-employee/${id}`);
      formik.setValues(response.data.data)
      setEditData(response.data.data);
      // setSuccess(response.data.success);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(true);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    district: Yup.string().min(2, "Invalid Address").required("Required"),
    jdate: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
    phone: Yup.string().matches(/^[6-9]\d{9}$/, "Please enter a valid phone number.").required("Required"),
  });
  const onDelete = async () => {
    try {
      axios
      .delete(`http://localhost:3000/api/delete/${id}`)
      .then((response) => {
        // setData(response.data);
      setDeletedata(response.data.success);
      
      });
    } catch (error) {
      setError(true);
      console.log("Error in delete",error)
    }
    
  };
  const formik = useFormik({
    initialValues: {
      name: editData.name || '',
      email: editData.email || '',
      phone: editData.phone || '',
      district: editData.district || '',
      role:editData.role || '',
      jdate: editData.jdate || '',
    },
    validationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await axios.put(`http://localhost:3000/api/update/${id}`, values);
        console.log("Form Submitted", response.data.data);
        if(response.data.errors){
          setBackendErrors(response.data.errors);
          setErrors(response.data.errors); 
          setValidationMessage(response.data.message);
          setError(true);
          setUpdate(false);
        }else if(response.data.success){
          setUpdate(true);
        }
        resetForm();
      }catch (error) {
        console.error("Error submitting form:", error);
        setError(true);
      }
    },
  });


  return (
    <>
    <h3 style={{ textAlign: "center", padding: 20, color: "white" }}>
        {/* Details of {initialValues.name} */}
      </h3>
      <div className="regfrm">
        <div className="container mx-auto col-sm-12 col-md-12 col-lg-5 s ">
          <form onSubmit={formik.handleSubmit}>
            <div
              className="shadow-lg bg-body rounded"
              style={{ backgroundColor: "white", opacity: 0.75 }}
            >
              <div className="mb-3 " style={{ padding: 20 }}>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  {...formik.getFieldProps("name")}
                />
                 {formik.touched.name && formik.errors.name && (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                )}
                {backendErrors.name_empty && <div>{backendErrors.name_empty}</div>}
                {backendErrors.name && <div>{backendErrors.name}</div>}
              </div>
              <div className="mb-3 " style={{ padding: 20 }}>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  {...formik.getFieldProps("email")} 
                />
                {formik.touched.email && formik.errors.email && (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                )}
                {/* {backendErrors.email_empty && <div>{backendErrors.email_empty}</div>} */}
              {/* {backendErrors.email && <div>{backendErrors.email}</div>} */}
              {/* {backendErrors.email_invalid && <div>{backendErrors.email_invalid}</div>} */}
              {backendErrors.email_exist && <div>{backendErrors.email_exist}</div>}
              </div>
              <div className="mb-3" style={{ padding: 20 }}>
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="form-control"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div style={{ color: "red" }}>{formik.errors.phone}</div>
                )}
              </div>

              <div className="mb-3" style={{ padding: 20 }}>
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <input
                  id="district"
                  name="district"
                  type="district"
                  className="form-control"
                  {...formik.getFieldProps("district")}
                />
                {formik.touched.district && formik.errors.district && (
                  <div style={{ color: "red" }}>{formik.errors.district}</div>
                )}
              </div>

              <div className="mb-3" style={{ padding: 20 }}>
                <label htmlFor="role" className="form-label">
                  Post
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  className="form-control"
                  {...formik.getFieldProps("role")}
                />
                 {formik.touched.role && formik.errors.role && (
                  <div style={{ color: "red" }}>{formik.errors.role}</div>
                )}
              </div>
              <div className="mb-3" style={{ padding: 20 }}>
                <label htmlFor="jdate" className="form-label">
                  Join Date
                </label>
                <input
                  id="jdate"
                  name="jdate"
                  type="text"
                  className="form-control"
                  {...formik.getFieldProps("jdate")}
                />
                 {formik.touched.jdate && formik.errors.jdate && (
                  <div style={{ color: "red" }}>{formik.errors.jdate}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-success m-2"
                style={{ color: "white" }}
              >
                Update
              </button>

              <button
               onClick={onDelete}
                type="button"
                className="btn btn-success"
                style={{ color: "white" }}
              >
                Delete
              </button>
              {/* </Link> */}
            </div>
            {/* {update && <SuccessUpdate onClose={handleupdate}/>}
            {deletedata &&  <SuccessDelete onClose={handledelete}/>}
            {error && <ErrorComponent message={validationMessage} onClose={handleError}/>} */}
          </form>
        </div>
      </div>
      {update && <SuccessUpdate onClose={handleupdate}/>}
      {deletedata &&  <SuccessDelete onClose={handledelete}/>}
      {error && <ErrorComponent message={validationMessage} onClose={handleError}/>}
      {/* {error && !deletedata && <ErrorComponent onClose={handleError} />} */}

    </>
  );
}

export default UpdateComponent;