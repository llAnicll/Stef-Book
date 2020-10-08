import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Container, Grid, Box, Typography, Paper, ButtonBase, Collapse, Button, Divider, IconButton, CircularProgress } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.primary.main
    },
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
    },
    grid: {
        margin: 0,
        width: '100%',
        height: '100%',
    },
    gridPreview: {
        minHeight: '138px'
    },
    paper: {
        background: '#f9f9f9',
        backgroundColor: '#f9f9f9', // theme.palette.primary.light
    },
    buttonBase: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing(2),
        displat: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    buttonContainer: {
        widht: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    moreButton: {
        transform: 'rotate(0deg)',
        transition: '0.25s'
    },
    moreButtonOpen: {
        transform: 'rotate(180deg)',
    },
    centerItem: {
        marginTop: theme.spacing(4),
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    sessionButton: {
        marginBottom: theme.spacing(5)
    }
}))

export default function Booking(props) {
    const {events, user, toggleDialog, loadingItems, setLoadingItems} = props
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState(null);

    const requestSession = e => {
        e.preventDefault();
        const to = 'mailto:Cailanlay@gmail.com';
        const subject = `?subject=Volleyball%20YYC%20Private%20Session%20Request`;
        const body = `&body=From:%20${user.getName()}%0AEmail:%20${user.getEmail()}%0A%0AHi%20Stefan,%0AMy%20name%20is%20${user.getName()},%20and%20I%20am%20looking%20to%20book%20a%20private%20session%0A`;
        const url = to + subject + body
        window.open(url, '_blank');
    }

    // toggle more events view
    const toggleExpand = () => {
        setExpanded(prevState => !prevState)
    }

    // filter events on events change
    useEffect(() => {
        const newList = events.filter(item => {
            if(item.hasOwnProperty('attendees')) {
                const maxAttendees = item.description.split('/', 2)[1];
                if(item.attendees.length < parseInt(maxAttendees)) {
                    return item;
                }
            } else {
                return item;
            }
        })
        if(!newList.length > 0) {
            setLoadingMessage('Looks like there are no upcoming events')
        } else {
            setLoadingMessage(null)
        }
        setLoadingItems(false);
        setFilteredEvents(newList)
    },[events])

    // get items that should be used
    const getMapableItems = (start, stopCondition) => {
        var newList = [];
        if(filteredEvents.length < stopCondition) {
            // ensures that the stop condition will not add 'undefined' to an index
            stopCondition = filteredEvents.length;
        }
        if(stopCondition > 0 && filteredEvents.length > 0){
            for(var i = start; i < stopCondition; i++) {
                newList.push(filteredEvents[i])
            }
        }
        return newList;
    }

    const sessionButton = (
        <div className={classes.centerItem}>
            <Button variant='contained' color='secondary' className={classes.sessionButton} onClick={requestSession}>Request a Session</Button>
        </div>
    ) 

    if(loadingItems || loadingMessage !== null) {
        return (
            <Box className={classes.background}>
            <Container id='booking' className={classes.container}>
                <Typography variant='h2' component='h2' align='center' gutterBottom>
                    Upcoming Events
                </Typography>
                {sessionButton}
                {loadingItems 
                    ? <div className={classes.centerItem}><CircularProgress color='secondary'/></div>
                    : <Typography variant='h6' align='center'>{loadingMessage}</Typography>
                }
                
            </Container>
            </Box>
        );
    }

    return (
        <Box className={classes.background}>
        <Container id='booking' className={classes.container}>
            <Typography variant='h2' component='h2' align='center' gutterBottom>
                Upcoming Events
            </Typography> 
            {sessionButton}
            {events.length > 0 && (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    className={classes.grid}
                >
                    {getMapableItems(0, 4).map((item, index) => {

                        const date = new Date(item.start.dateTime).toLocaleDateString();
                        const start = new Date(item.start.dateTime).toLocaleTimeString();
                        const end = new Date(item.end.dateTime).toLocaleTimeString();

                        return (
                            <Grid item key={index} xs={12} sm={12} md={6} lg={3}>
                                <Paper elevation={4} className={classes.paper}>
                                    <ButtonBase className={classes.buttonBase} onClick={() => toggleDialog(item)}>
                                        <Typography variant='h5' gutterBottom>{item.summary}</Typography>
                                        <Typography variant='body2'>{`${date} ⋅ ${start} - ${end}`}</Typography>
                                        <Typography variant='body2'>{item.location}</Typography>
                                    </ButtonBase>
                                </Paper>
                            </Grid>
                        )
                        
                    })}
                </Grid>
            )} 
            <Collapse in={expanded} timeout="auto" >
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={3}
                    className={classes.grid}
                >
                    {filteredEvents.length > 4 && getMapableItems(4, filteredEvents.length).map((item, index) => {

                        const date = new Date(item.start.dateTime).toLocaleDateString();
                        const start = new Date(item.start.dateTime).toLocaleTimeString();
                        const end = new Date(item.end.dateTime).toLocaleTimeString();
            
                        return (
                            <Grid item key={index} xs={12} sm={12} md={6} lg={3}>
                                <Paper elevation={4}  className={classes.paper}>
                                    <ButtonBase className={classes.buttonBase} onClick={() => toggleDialog(item)}>
                                        <Typography variant='h5' gutterBottom>{item.summary}</Typography>
                                        <Typography variant='body2'>{`${date} ⋅ ${start} - ${end}`}</Typography>
                                        <Typography variant='body2'>{item.location}</Typography>
                                    </ButtonBase>
                                </Paper>
                            </Grid>
                        )

                    })}
                </Grid>
            </Collapse>
            <Box className={classes.buttonContainer}>
                {events.length > 4 && (
                    <IconButton onClick={toggleExpand} className={expanded ? `${classes.moreButton} ${classes.moreButtonOpen}` : classes.moreButton}>
                        <ExpandMoreIcon/>
                    </IconButton>
                )}
            </Box>
        </Container>
        </Box>
    )
}