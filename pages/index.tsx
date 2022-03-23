import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  changeShowTrue,
  changeShowFalse,
  fetchCats,
} from "../store/Slices/catSlice";
import { RootState } from "../store/store";

interface ImageType {
  id: string;
  width: number;
  height: number;
  url: string;
}
interface WeightType {
  imperial: string;
  metric: string;
}

interface CatTypes {
  adaptability: number;
  affection_level: number;
  alt_names: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  image: ImageType;
  indoor: number;
  intelligence: number;
  lap: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vocalisation: number;
  weight: WeightType;
  wikipedia_url: string;
  show: boolean;
}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const cats_list = useSelector(
    (state: RootState) => state.catsReducer.cat_list
  );
  return (
    <div className="container">
      <Head>
        <title>RTK_SAGA</title>
        <meta name="description" content="Redux-saga with Redux-toolkit" />
      </Head>
      <style jsx>{`
        .container {
          width: 100%;
          min-height: 100vh;
          background-color: #090504;
        }
        .header {
          margin: 0;
        }
        .main {
          display: flex;
          flex-direction: column;
          max-width: 50vw;
          align-items: center;
          margin: auto;
        }
        .cat_list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        button {
          color: black;
        }
        .breed_box {
          background-color: #b37a3d;
          height: 5vh;
          cursor: pointer;
          border: 1px solid #c9973a;
          text-align: center;
          font-size: 20px;
        }
        .breed_box:hover {
          transform: scale(1.1);
          transition: 0.2s;
        }
        .image_container {
          width: 300px;
          position: absolute;
          /* top: 0; */
        }
      `}</style>
      <div className="main">
        <h1 className="header">So many CATS around me</h1>
        {cats_list.length === 0 && (
          <button onClick={() => dispatch(fetchCats())}>Get Kitties🐈</button>
        )}
        <div className="cat_list">
          {cats_list.length === 0 ? (
            <div>hit the Get Button!</div>
          ) : (
            cats_list.map((breed: CatTypes, idx: number) => {
              return (
                <div
                  key={idx}
                  className="breed_box"
                  onMouseEnter={() => {
                    dispatch(changeShowTrue(breed.id));
                    console.log(breed.image);
                  }}
                  onMouseLeave={() => dispatch(changeShowFalse(breed.id))}
                >
                  {breed.name}
                  {breed.image && breed.image.url ? (
                    <div
                      className="image_container"
                      style={
                        window.scrollY /
                          (document.body.offsetHeight - window.innerHeight) >
                        0.5
                          ? { bottom: 0 }
                          : { top: 0 }
                      }
                    >
                      {breed.show && (
                        <Image
                          src={breed.image.url}
                          height={breed.image.height}
                          width={breed.image.width}
                          alt={breed.description}
                        />
                      )}
                    </div>
                  ) : (
                    <div>No image available</div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
