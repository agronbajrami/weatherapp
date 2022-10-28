import { gql, useQuery } from "@apollo/client";
import { Button, Card } from "antd";
import { useRouter } from "next/router";
import style from "./Details.module.scss";
import bgImage from "../public/assets/weatherimage.jpg";

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

const Details = () => {
  const router = useRouter().query;
  const routing = useRouter();

  const { loading, data, error } = useQuery(GET_CITIES, {
    variables: {
      name: router.id,
    },
  });

  console.log("CALL THE DAMMNN DATA", data);

  const homeClickHandler = () => {
    routing.push({
      pathname: "/",
    });
  };

  return (
    <div
      className={style.city_content}
      style={{
        backgroundImage: `url(${bgImage.src})`,
        width: "100%",
        height: "100vh",
      }}
    >
      <Card
        style={{ width: 600, backgroundColor: "white", borderRadius: "20px" }}
      >
        <div>
          <h2>
            Weather today in {data?.getCityByName?.name},{" "}
            {data?.getCityByName?.country}
          </h2>
        </div>
        <div>
          <h1>
            {Math.ceil(
              data?.getCityByName?.weather?.temperature?.actual - 273.15
            )}
            C
          </h1>
          <h4>Feels Like</h4>
          <h3>
            {Math.ceil(
              data?.getCityByName?.weather?.temperature?.feelsLike - 273.15
            )}
            C
          </h3>
        </div>
        <div></div>
      </Card>
      <Button
        type='primary'
        className={style.home_button}
        onClick={homeClickHandler}
      >
        Go To HomePage
      </Button>
    </div>
  );
};

export default Details;
