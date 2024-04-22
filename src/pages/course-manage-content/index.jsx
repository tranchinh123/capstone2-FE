import { useState, useEffect } from "react";
import { useParams } from "react-router";
import OfflineCourseManageContent from "./offline";
import OnlineCourseManageContent from "./online";

const CourseManageContentPage = () => {
  const [data, setData] = useState([
    {
        "gender": "female",
        "name": {
            "title": "Mrs",
            "first": "Expedita",
            "last": "Silveira"
        },
        "email": "expedita.silveira@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/39.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/39.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/39.jpg"
        },
        "nat": "BR"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Đuraš",
            "last": "Simić"
        },
        "email": "duras.simic@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/62.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/62.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
        },
        "nat": "RS"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Pavle",
            "last": "Tišma"
        },
        "email": "pavle.tisma@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/83.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/83.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/83.jpg"
        },
        "nat": "RS"
    },
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Afşar",
            "last": "Alnıaçık"
        },
        "email": "afsar.alniacik@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/56.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/56.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/56.jpg"
        },
        "nat": "TR"
    },
    {
        "gender": "female",
        "name": {
            "title": "Miss",
            "first": "Harper",
            "last": "Patel"
        },
        "email": "harper.patel@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/82.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/82.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/82.jpg"
        },
        "nat": "NZ"
    },
    {
        "gender": "female",
        "name": {
            "title": "Mademoiselle",
            "first": "Marion",
            "last": "Legrand"
        },
        "email": "marion.legrand@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/50.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/50.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/50.jpg"
        },
        "nat": "CH"
    },
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "Garance",
            "last": "Guerin"
        },
        "email": "garance.guerin@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/84.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/84.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/84.jpg"
        },
        "nat": "FR"
    },
    {
        "gender": "female",
        "name": {
            "title": "Ms",
            "first": "مرسانا",
            "last": "حیدری"
        },
        "email": "mrsn.hydry@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/women/10.jpg",
            "medium": "https://randomuser.me/api/portraits/med/women/10.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/women/10.jpg"
        },
        "nat": "IR"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Aaron",
            "last": "Ryan"
        },
        "email": "aaron.ryan@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/47.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/47.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/47.jpg"
        },
        "nat": "NO"
    },
    {
        "gender": "male",
        "name": {
            "title": "Mr",
            "first": "Leo",
            "last": "Perry"
        },
        "email": "leo.perry@example.com",
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/90.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/90.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/90.jpg"
        },
        "nat": "US"
    }
]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

// const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   fetch(
  //     'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
  //   )
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results]);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);
  
  return (
    <>
      {/* <OnlineCourseManageContent data={data} setData={setData} /> */}
      <OfflineCourseManageContent data={data} setData={setData} />
    </>
  );
};

export default CourseManageContentPage;
