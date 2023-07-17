import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Table = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const result = await axios.get(procces.env.REACT_APP_API_URL);
      setData(result?.data?.data);
    } catch (error) {
      toast.error("Unable to get data!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>Vendor Name</th>
          <th>Date</th>
          <th>Model Number</th>
          <th>Unit Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {console.log(data)}
        {data?.length > 0 &&
          data?.map(
            ({ vendorName, modelNumber, unitPrice, quantity, date }) => (
              <tr>
                <td>{vendorName}</td>
                <td>{new Date(date).toLocaleDateString()}</td>
                <td>{modelNumber}</td>
                <td>{unitPrice}</td>
                <td>{quantity}</td>
              </tr>
            )
          )}
      </tbody>
    </table>
  );
};

export default Table;
