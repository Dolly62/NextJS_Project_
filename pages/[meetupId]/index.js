import { Fragment } from "react";

function MeetupDetails() {
  return (
    <Fragment>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/32/Googleplex_HQ_%28cropped%29.jpg"
        alt="A First Meetup"
      />
      <h1>A First Meetup</h1>
      <address>Some Street 5</address>
      <p>The meetup description</p>
    </Fragment>
  );
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params;
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/Googleplex_HQ_%28cropped%29.jpg",
        id: meetupId,
        title: "A First Meetup",
        address: "Some Street 5",
        description: "The meetup description",
      },
    },
  };
}

export default MeetupDetails;
