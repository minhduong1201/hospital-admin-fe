import React, { useEffect, useState } from "react";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { CChart, CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from "@coreui/icons";

import avatar1 from "../assets/images/avatars/1.jpg";
import avatar2 from "../assets/images/avatars/2.jpg";
import avatar3 from "../assets/images/avatars/3.jpg";
import avatar4 from "../assets/images/avatars/4.jpg";
import avatar5 from "../assets/images/avatars/5.jpg";
import avatar6 from "../assets/images/avatars/6.jpg";

import WidgetsBrand from "../components/WidgetsBrand";
import WidgetsDropdown from "../components/WidgetsDropdown";
import axios from 'axios';
import { userRequest } from "../requestMethod";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { getRandomColor } from "../utils/getRandomColor";
const date = new Date() as any;
const getDayAgo = (day: any)=>{
  return (new Date(date - 1000 * 60 * 60 * 24 * day)).toDateString()
}
const Dashboard = () => {
  const random = (min: any, max: any) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const progressExample = [
    { title: "Visits", value: "29.703 Users", percent: 40, color: "success" },
    { title: "Unique", value: "24.093 Users", percent: 20, color: "info" },
    {
      title: "Pageviews",
      value: "78.706 Views",
      percent: 60,
      color: "warning",
    },
    { title: "New Users", value: "22.123 Users", percent: 80, color: "danger" },
    {
      title: "Bounce Rate",
      value: "Average Rate",
      percent: 40.15,
      color: "primary",
    },
  ];

  const progressGroupExample1 = [
    { title: "Monday", value1: 34, value2: 78 },
    { title: "Tuesday", value1: 56, value2: 94 },
    { title: "Wednesday", value1: 12, value2: 67 },
    { title: "Thursday", value1: 43, value2: 91 },
    { title: "Friday", value1: 22, value2: 73 },
    { title: "Saturday", value1: 53, value2: 82 },
    { title: "Sunday", value1: 9, value2: 69 },
  ];

  // const progressGroupExample2 = [
  //   { title: "Male", icon: cilUser, value: 53 },
  //   { title: "Female", icon: cilUserFemale, value: 43 },
  // ];

  // const progressGroupExample3 = [
  //   { title: "Organic Search", icon: cibGoogle, percent: 56, value: "191,235" },
  //   { title: "Facebook", icon: cibFacebook, percent: 15, value: "51,223" },
  //   { title: "Twitter", icon: cibTwitter, percent: 11, value: "37,564" },
  //   { title: "LinkedIn", icon: cibLinkedin, percent: 8, value: "27,319" },
  // ];
  const [listBins, setListBins] = useState<any>();
  const [dataTrash, setDataTrash] = useState<any>();
  const [statisticByDay, setStatisticByDay] = useState<any>();
  const [typeTrash, setTypeTrash] = useState('');
  useEffect(()=>{
    const fetch = async()=>{
      const res = await userRequest.get("/bin");
      console.log("Check res  :", res)
      setListBins(res.data);
      setDataTrash({
        organic:res.data.map((item: { organic: any; })=>item.organic).reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        ),
        inorganic:res.data.map((item: { inorganic: any; })=>item.inorganic).reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        ),
        recyclable:res.data.map((item: { recyclable: any; })=>item.recyclable).reduce(
          (accumulator: any, currentValue: any) => accumulator + currentValue,
          0
        ),
      })
      const res2 = await userRequest.post("/bin/statistic-trash", {
        binIds: res.data.map((item: { _id: any; })=>item._id),
        numDay: 10
      })
      console.log("Check res 2 :", res2)
      setStatisticByDay(res2.data)
    }
    fetch()
  },[])
  console.log("Check list bins:", listBins)
  const handleChange = (e: any) =>{
      setTypeTrash(e.target.value)
  }
  const ArrayColor = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#a295e3', '#000000']
  return (
    <>
   <WidgetsDropdown dataTrash={dataTrash}/>
      <CCard className="mb-4" >
        <CCardBody>
          <CRow style={{marginBottom:'25px'}}>
            <CCol sm={8}>
              <h4 id="traffic" className="card-title mb-0">
                Lượng rác theo ngày
              </h4>
              {/* <div className="small text-medium-emphasis">
                January - July 2021
              </div> */}
            </CCol>
            <CCol sm={4} className="d-none d-md-block">
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chọn loại rác</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeTrash}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>Tổng rác</MenuItem>
          <MenuItem value={'organics'}>Hữu cơ</MenuItem>
          <MenuItem value={'inorganics'}>Vô cơ</MenuItem>
          <MenuItem value={'recyclables'}>Tái chế</MenuItem>
        </Select>
      </FormControl> 
            </CCol>
          </CRow>
          <CChart
            type="line"
            data={{
            labels: [getDayAgo(9), getDayAgo(8), getDayAgo(7), getDayAgo(6), getDayAgo(5), getDayAgo(4), getDayAgo(3), getDayAgo(2), getDayAgo(1),date.toDateString()],
            datasets:statisticByDay && statisticByDay.map((item: { name: any; recyclables: any; organics:any; inorganics:any}, index:number) => {
              const color = getRandomColor();
              // const type = typeTrash;
              const sum=[];
              for(var i = 0; i < 10; i++){
                sum.push(item.inorganics[i]+item.organics[i]+item.recyclables[i]);
             }
              return {
                label: `Thung ${item.name}`,
                    backgroundColor: ArrayColor[index],
                    borderColor: ArrayColor[index],
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    // data: item.recyclables,
                    data: typeTrash == 'recyclables' ? item.recyclables : typeTrash=='organics' ? item.organics : typeTrash =='inorganics' ? item.inorganics : sum

              }
            })
            }}
          />
        </CCardBody>
      </CCard>

      {/* <WidgetsBrand withCharts />  */}

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader style={{fontSize:"24px", fontWeight:'500'}}>Thống kê {" & "} Lượng rác</CCardHeader>
            <CCardBody>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      STT
                    </CTableHeaderCell>
                    <CTableHeaderCell>Tên thùng rác</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                    Vị trí thùng
                    </CTableHeaderCell>
                    <CTableHeaderCell>Rác vô cơ</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Rác hữu cơ
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Rác tái chế
                    </CTableHeaderCell>
                    <CTableHeaderCell>Tổng</CTableHeaderCell>
                    <CTableHeaderCell>Ngày tạo</CTableHeaderCell>
                    <CTableHeaderCell>Trạng thái thùng</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {(listBins||[]).map((item: { createdAt:any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; address: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; inorganic: number ; organic: number ; recyclable:  number ; status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: number) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                          {index+1}
                      </CTableDataCell>
                      <CTableDataCell>
                            Thùng {item.name}
                      </CTableDataCell>
                      <CTableDataCell className="text-left">
                        {/* <div style={{width:'30%'}}> */}
                        {item.address}
                        {/* </div> */}
                      
                 
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.inorganic}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      {item.organic}

                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      {item.recyclable}

                      </CTableDataCell>
                      <CTableDataCell>
                       {item.recyclable + item.organic+item.inorganic}
                      </CTableDataCell>
                      <CTableDataCell>
                       {item.createdAt.slice(0,10)}
                      </CTableDataCell>
                      <CTableDataCell>
                       {item.status}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
