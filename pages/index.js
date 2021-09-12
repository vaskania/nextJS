//domain.com
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React-NextJS meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

//Metadata title & description

export async function getStaticProps() {
  // fetch data from API / Database

  const client = await MongoClient.connect(
    "mongodb+srv://vaska:vaskania@nextjs-test.oyffq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

/* export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  // fetch data from API / Database
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */
