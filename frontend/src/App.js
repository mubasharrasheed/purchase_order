import React, { useState } from "react";
import "./App.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "./componenets/Table";

const SignupSchema = Yup.object().shape({
  vendor: Yup.string().required("Vendor required"),
  date: Yup.date().required("Date required"),
  file: Yup.mixed().required("CSV file required"),
});

const App = () => {
  const [loading, setloading] = useState(false);
  return (
    <div className="container_form">
      <h1>Bulk Order Creation</h1>
      <Formik
        initialValues={{
          date: "",
          vendor: "",
          file: null,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          setloading(true);
          try {
            const formData = new FormData();
            formData.append("vendorName", values.vendor);
            formData.append("date", new Date(values.date));
            formData.append("file", values.file);

            const result = await axios.post(
              procces.env.REACT_APP_API_URL,
              formData
            );
            setloading(false);
            toast.success(result?.data?.message);
          } catch (error) {
            setloading(false);
            toast.error("Unable to process the request");
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="form">
            <div className="row">
              <label>Vednor</label>
              <Field name="vendor" />
              {errors.vendor && touched.vendor ? (
                <div className="errMesg">{errors.vendor}</div>
              ) : null}
            </div>
            <div className="row">
              <label>Date</label>
              <Field name="date" type="date" />
              {errors.date && touched.date ? (
                <div className="errMesg">{errors.date}</div>
              ) : null}
            </div>
            <div className="row">
              <label>File</label>

              <input
                name="file"
                type="file"
                accept=".csv"
                onChange={(e) => setFieldValue("file", e.target.files[0])}
              />
              {errors.file && touched.file ? (
                <div className="errMesg">{errors.file}</div>
              ) : null}
            </div>
            <div className="row">
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div style={{ overflowX: "auto" }}>
        <Table />
      </div>
    </div>
  );
};

export default App;
