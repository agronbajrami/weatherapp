import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card } from "antd";
import style from "./Home.module.scss";
import Image from "next/image";

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

const Homeee = () => {
  const router = useRouter();
  const myCities = GET_CITIES.map((item) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery(item);
  });

  return (
    <div className={style.cards}>
      {myCities.map((item) => {
        return (
          <div
            key={item?.data?.getCityByName?.name}
            className={style.card_content}
          >
            <Link href={"/" + item?.data?.getCityByName?.name}>
              <Card
                style={{
                  width: 270,
                  height: 250,
                  backgroundColor: "white",
                  marginLeft: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                <h1>{item?.data?.getCityByName?.name}</h1>
                <h2>
                  {item?.data?.getCityByName?.weather?.summary?.description}
                </h2>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Homeee;
