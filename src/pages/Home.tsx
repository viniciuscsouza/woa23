import React, { useContext } from "react";
import Tab from "../components/BasicTable/Tab";
import BasicTable from "../components/BasicTable/BasicTable";
import { TableContext } from "../data/tableContext";
import { EventContext } from "../data/eventContext";
import { Container } from "@mui/material";
import Timeline, { TimeLineProps } from "../components/BasicTable/Timeline"


export default function Home(){
  const eventData = useContext(EventContext)
  const { attendees } = useContext(TableContext)
  const [data, setData] = React.useState([{}])

  const showsList = attendees.map((data) => {
    const attendee = {
      user_uid: data.user_uid, 
      uid: data.uid
    }
    return attendee
  })

  const timeLineList = () => {
    let fiteredEvent: TimeLineProps[] = []
    if (eventData !== undefined) {
      Object.keys(eventData).forEach(key => {
        const event = eventData[parseInt(key)]
        if (showsList[0] && showsList[0].uid.includes(event.uid)){
          fiteredEvent.push({start: event['start'], band: event['artists'][0]['title']})
        }
      })
    }
    return fiteredEvent
  }

  React.useEffect(() => {
    setData(timeLineList())
  }, [showsList])

  return (
    <div>
      <h2>WOA 23</h2> 
      <Container maxWidth="lg">
        <Container sx={{display: 'flex', flexDirection: 'row'}}>
          <Container sx={{display: 'flex', flexDirection: 'column'}}>
            <Tab>
              <BasicTable />
            </Tab>
          </Container>
        </Container>
            <Timeline data={data}/>
      </Container>
    </div>
  )
}
