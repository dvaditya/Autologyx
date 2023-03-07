import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// import history from 'utils/history';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    margin: '25px 30px',
    fontFamily: 'HelveticaNeueLTPro-Lt,sans-serif'
  },
  root: {
    color: '#002c5f',
    borderRadius: 8,
    height: '100%',
    fontFamily: 'HelveticaNeueLTPro-Lt,sans-serif'
  },
  actionArea: {
    height: '100%',
  },
  media: {
    minHeight: 180,
    cursor: 'default',
    backgroundColor: '#eee',
    padding: '8px ​0',
    height: '100%',
  },
  overlay: {
    // background: 'rgb(0,0,0)',
    // background:
    //     '-moz-linear-gradient(90deg, rgba(0,0,0,0.8869922969187675) 0%, rgba(0,0,0,0.7749474789915967) 38%, rgba(0,0,0,0.2091211484593838) 74%)',
    // background:
    //     '-webkit-linear-gradient(90deg, rgba(0,0,0,0.8869922969187675) 0%, rgba(0,0,0,0.7749474789915967) 38%, rgba(0,0,0,0.2091211484593838) 74%)',
    // background:
    //     'linear-gradient(90deg, rgba(0,0,0,0.8869922969187675) 0%, rgba(0,0,0,0.7749474789915967) 38%, rgba(0,0,0,0.2091211484593838) 74%)',
    // filter:
    //     'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1)',
    // height: '200px',
  },
  overlayDisabled: {
    background: 'rgb(189 189 189 / 61%)',
    height: '200px',
  },
  text: {
    color: '#002c5f',
    fontFamily: 'HelveticaNeueLTPro-Lt,sans-serif'
  },
  textSecondary: {
    fontWeight: 100,
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    marginBottom: '0.6rem',
    color: '#002c5f',
    fontFamily: 'HelveticaNeueLTPro-Lt,sans-serif'
  },
  textPrimary: {
    fontSize: '1.4rem',
    fontFamily: 'HelveticaNeueLTPro-Lt,sans-serif'
  },
  cardButton: {
    color: '#002c5f',
    marginLeft: 6,
    textTransform: 'capitalize',
    backgroundColor: '#eee',
    fontWeight: 600,
    borderRadius: 3,
    padding: '6px 12px',
    border: '2px solid #002c5f',
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 25%)',
    },
  },
  cardContent: {
    padding: '16px 16px 50px 16px',
  },

  gridRow: {
    marginBottom: 10,
  },

  cardActions: {
    position: 'absolute',
    bottom: 0,
    width: 'calc(100% - 16px)',
    justifyContent: 'flex-end',
    padding: '15px 0',
  },
}));

const CardItem = ({
  url,
  name,
  text,
  to,
  external,
  disabled,
  buttonText = 'Get Started',
}) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = () => {
    if (external) {
      var win = window.open(to, '_blank');
      win.focus();
    } else history.push(to);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia className={classes.media} title={name}>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.textSecondary}
            >
              {name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.textPrimary}
            >
              {text}
            </Typography>
          </CardContent>

          <CardActions className={classes.cardActions}>
            {!disabled ? (
              <Button
                size="small"
                color="primary"
                className={classes.cardButton}
                onClick={() => handleClick()}
              >
                {buttonText}
              </Button>
            ) : null}
          </CardActions>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

CardItem.defaultProps = {
  external: false,
  disabled: false,
};

export default CardItem;
