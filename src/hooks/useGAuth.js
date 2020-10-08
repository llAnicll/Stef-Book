import {useState, useEffect} from 'react'
import config from 'calConfig';

export default function useGAuth(setLoading) {
    const gapi = window.gapi;
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);

    // get the minimum date from which events should be shown
    const getMinDate = () => {
        const today = new Date();
        const date = today.getDate();
        var tomorrow = new Date().setDate(date+1);
        tomorrow = new Date(tomorrow).setHours(0,0,0)
        console.log('Tomorrow: ', new Date(tomorrow))
        return tomorrow;
    }

    // get the events
    const getEvents = () => {
        // we get the events within useGAuth as this the app is only two levels deep
        gapi.client.calendar.events.list({
            calendarId: process.env.REACT_APP_CALENDAR_ID,
            timeMin: (new Date(getMinDate())).toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 250,
            orderBy: 'startTime'
        }).then(res => {
            setEvents(res.result.items)
        })
    }
    
    // update current user
    const updateCurrentUser = isSignedIn => {
        if (isSignedIn) {
            const googleUser = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
            console.log('user: ', gapi.auth2.getAuthInstance().currentUser.get())
            setUser(googleUser);
        } else {
            setUser(null);
        }
        getEvents();
    };
    
    useEffect(() => {
        setLoading(true);
        // load client lib
        gapi.load('client:auth2', () => {
            // init client lib
            gapi.client.init(config).then(() => {
                // get auth instance
                const googleAuth =  gapi.auth2.getAuthInstance();
                // listen for changes in auth status
                googleAuth.isSignedIn.listen(updateCurrentUser);
                // set the initial auth instance
                updateCurrentUser(googleAuth.isSignedIn.get());
                // handle error
            }).catch(err => console.log(err.code, err.message));
        });
    }, []);
    
    return {user, events, setEvents};
}
