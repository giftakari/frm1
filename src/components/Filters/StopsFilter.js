import React from "react";

const StopsFilter = ({flightNo, setFlightNo}) => {
  const stops = [1, 2, 3];
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl">No. of Stops :</h3>
      <div className="flex flex-col gap-1">
        {stops.map((item, key) => {
          return (
            <div key={key} className="flex gap-3">
              {flightNo.includes(item) === true ? (
                <input
                  type="checkbox"
                  id={item + "stop"}
                  value={item}
                  checked={true}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFlightNo((prev) => {
                        return [...prev, +e.target.value];
                      });
                    } else {
                      let b = flightNo.filter(
                        (alpha) => alpha !== +e.target.value
                      );
                      setFlightNo(b);
                    }
                  }}
                />
              ) : (
                <input
                  type="checkbox"
                  value={item}
                  id={item + "stop"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFlightNo((prev) => {
                        return [...prev, +e.target.value];
                      });
                    } else {
                      let b = flightNo.filter(
                        (alpha) => alpha !== +e.target.value
                      );
                      setFlightNo(b);
                    }
                  }}
                />
              )}
              {item >= 3 ? (
                <label htmlFor={item + "stop"}>2+</label>
              ) : (
                <label htmlFor={item + "stop"}>{item}</label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StopsFilter;
