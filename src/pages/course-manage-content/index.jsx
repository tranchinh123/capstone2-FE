import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import OfflineCourseManageContent from './offline';
import OnlineCourseManageContent from './online';

const CourseManageContentPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <OnlineCourseManageContent data={data} setData={setData} />
      {/* <OfflineCourseManageContent data={data} setData={setData} /> */}
    </>
  );
};

export default CourseManageContentPage;