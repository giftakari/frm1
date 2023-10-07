import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const [departureArray, setdepartureArray] = useState([])
  const [arrivalArray, setarrivalArray] = useState([])
  const [From, setFrom] = useState([]);
  const [arrival, setArrival] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  window.From = From;
  window.arrival = arrival;

  async function fetchData() {
    // axios
    //   .get("http://localhost:4000/CatalogProductOfferingsResponse")
    //   .then((res) => {
    //     console.log("this is res ", res);
    //     setData(res.data.ReferenceList[0].Flight);
    //   })
    //   .catch((er) => {
    //     console.log("error", er);
    //   });
    const res = await axios.get("http://localhost:4000/CatalogProductOfferingsResponse");
    const normaldata = await res.data;
    setData(normaldata.ReferenceList[0].Flight);
    let a = [];
    let b = [];
    normaldata.ReferenceList[0].Flight.forEach((i) => {
      if (!a.includes(i.Departure.location)) {
        a.push(i.Departure.location);
      }
      if (!b.includes(i.Arrival.location)) {
        b.push(i.Arrival.location);
      }
    });
    setarrivalArray(b)
    setdepartureArray(a)
  }

  useEffect(() => {
    fetchData();
  }, [])
  console.log("from ", From);
  console.log("to ", arrival);
  console.log("Startdate ", startDate);
  console.log("endDate  ", endDate);
  return (
    <div className="App" style={{ display: "flex", gap: "10px", margin: "20px" }}>

      <div style={{ display: "flex", flexDirection: 'column', gap: '5px' }}>
        {
          departureArray.map((item, key) => {
            return (
              <div key={key}>
                <input type="checkbox" id={item + "dept"} name={item + "dept"} value={item} onChange={() => {
                  let x = document.getElementById(item + "dept");
                  if (x.checked) {
                    setFrom(prev => {
                      return [...prev, x.value]
                    })
                  } else {
                    let b = From.filter((alpha) => alpha !== x.value);
                    setFrom(b);
                  }
                }} />
                <label for={item + "dept"}>{item}</label>
              </div>
            )
          })
        }
      </div>

      <div style={{ display: "flex", flexDirection: 'column', gap: '5px' }}>
        {
          arrivalArray.map((item, key) => {
            // console.log("this is item",item);
            return (
              <div key={key}>
                <input type="checkbox" id={item + "arrival"} name={item + "arrival"} value={item} onChange={() => {
                  let x = document.getElementById(item + "arrival");
                  if (x.checked) {
                    setArrival(prev => {
                      return [...prev, x.value]
                    })
                  } else {
                    let b = arrival.filter((alpha) => alpha !== x.value);
                    setArrival(b);
                  }
                }} />
                <label for={item + "arrival"}>{item}</label>
              </div>
            )
          })
        }
      </div>


      <input type="date" id='StartDate' onChange={() => {
        let x = document.getElementById('StartDate').value;
        setStartDate(x);
      }} />
      <input type="date" id='EndDate' onChange={() => {
        let x = document.getElementById('EndDate').value;
        setEndDate(x);
      }} />

    </div>
  );
}

export default App;
