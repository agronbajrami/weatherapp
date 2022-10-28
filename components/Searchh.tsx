import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Input, Space } from "antd";
import { useRouter } from "next/router";

const { Search } = Input;

export const GET_CITIES = gql`
  query myQuery($name: String!) {
    getCityByName(name: $name) {
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

const Searchh = () => {
  const [city, setCity] = useState<string>("");
  const router = useRouter();
  const onSearch = (value: string) => {
    setCity(value);
    router.push({
      pathname: "[id]",
      query: {
        id: value,
      },
    });
  };

  const { loading, data, error } = useQuery(GET_CITIES, {
    variables: {
      name: city,
    },
  });

  return (
    <div>
      <Search
        placeholder='input search text'
        onSearch={onSearch}
        enterButton
        style={{ width: "300px", marginTop: "2rem" }}
      />
    </div>
  );
};

export default Searchh;
