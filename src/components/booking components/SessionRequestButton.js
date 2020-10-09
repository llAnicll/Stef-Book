import React from 'react'
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({

}))

export default function SessionRequestButton(props) {
    const { user } = props;
    const classes = useStyles(); 

    // yes I know this could be better...
    const requestSession = e => {
        e.preventDefault();
        const to = 'mailto:Cailanlay@gmail.com';
        const subject = `?subject=Volleyball%20YYC%20Private%20Session%20Request`;
        const body = `&body=From:%20${user.getName()}%0AEmail:%20${user.getEmail()}%0A%0AHi%20Stefan,%0AMy%20name%20is%20${user.getName()},%20and%20I%20am%20looking%20to%20book%20a%20private%20session%0A`;
        const url = to + subject + body
        window.open(url, '_blank');
    }

    return (
        <Button variant='contained' color='secondary' className={classes.sessionButton} onClick={requestSession}>Request a Session</Button>
    )
}
