import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ReactRoundedImage from "react-rounded-image";
import Navigation from "./components/Navigation";
import CssBaseline from '@material-ui/core/CssBaseline';


function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    (async () => {
      const result = await axios("https://randomuser.me/api/?seed=aaa&results=5000");
      setData(result.data.results);
    })();
  }, []);

  function Mailto({ email, ...props}) {
    return (
      <a href={`mailto:${email}`}>
        {props.children}
      </a>
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: "Picture",
        accessor: "picture.thumbnail",
        disableFilters: true,
        Cell: tableProps => (
          <ReactRoundedImage image={tableProps.row.original.picture.thumbnail} imageWidth="50" imageHeight="50" roundedSize="0"></ReactRoundedImage>
        )
      },
      {
        Header: "Full Name",
        accessor: d => d.name.first[0] + ' ' + d.name.last[0]
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: tableProps => (
          <Mailto email={tableProps.row.original.email}>{tableProps.row.original.email}</Mailto>
        )
      },
      {
        Header: "Gender",
        accessor: "gender"
      },
      {
        Header: "Age",
        accessor: "dob.age"
      }
    ],
    []
  );

  return (
    <div className="app">
      <CssBaseline/>
      <Navigation columns={columns} data={data}/>
    </div>
  );
}


export default App;