import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";

function MeetupDetails(props) {
  return (
    <Fragment>
      <img src={props.meetupData.image} alt="A First Meetup" style={{ width: "80%"}}/>
      <h1>{props.meetupData.title}</h1>
      <address>{props.meetupData.address}</address>
      <p>{props.meetupData.description}</p>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://test-user_12:vgW_4Sy23@cluster0.3uvvbbl.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://test-user_12:vgW_4Sy23@cluster0.3uvvbbl.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const objectId = new ObjectId(meetupId);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: objectId,
  });


  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
