/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Skeleton, Switch, Card, Avatar } from "antd";
import classes from "./Main.module.scss";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

type Props = {};

let cities = ["skopje", "london", "paris", "tokyo", "new york"];
const GET_CITIES = cities.map((item) => {
  return gql`
  query {
    getCityByName(name: "${item}") {
      id
      name
      country
      coord {
        lon
        lat
      }
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`;
});

const day =
  new Date(Date.now()).toLocaleString("en-us", { weekday: "long" }) + " ";

function Cities({}: Props) {
  const router = useRouter();

  const myCities = GET_CITIES.map((item) => {
    return useQuery(item);
  });

  function pageHandler(name: string) {
    router.push({
      pathname: "[id]",
      query: {
        id: name,
      },
    });
  }

  return (
    <div className={classes.content}>
      <br />
      <br />
      <br />
      <div className={classes.cards}>
        {myCities.map((item) => {
          return (
            <li key={Math.random().toString(36).substring(2, 9)}>
              <Card
                hoverable
                style={{
                  width: 220,
                  marginTop: 16,
                  textAlign: "center",
                  borderRadius: "10px",
                }}
                onClick={() => pageHandler(item.data?.getCityByName.name)}
              >
                <h1>{item?.data?.getCityByName.name}</h1>
                <p style={{ color: "black" }}>
                  {item.data?.getCityByName.weather?.summary.description}
                </p>
              </Card>
            </li>
          );
        })}
      </div>
      <h2
        style={{
          color: "#00FF11",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "30vh",
        }}
      >
        {"Weather for " + day}
      </h2>
    </div>
  );
}

export default Cities;
