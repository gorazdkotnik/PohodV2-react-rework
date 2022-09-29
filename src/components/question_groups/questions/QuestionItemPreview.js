import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import QuestionCard from '../../questions/QuestionCard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionItemPreview = ({ open, setOpen, question }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setOpen(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Predogled vprašanja
          </Typography>
        </Toolbar>
      </AppBar>

      {/* sm container */}
      <Container maxWidth="sm" sx={{ my: 5 }}>
        <Card>
          <CardContent>
            <QuestionCard
              question={question}
              answerId={1}
              questionIndex={1}
              numberOfQuestions={1}
              setAnswerId={() => {}}
              isAnswering={false}
              timerDuration={30}
              remainingTime={30}
              onComplete={() => {}}
              onUpdate={() => {}}
              submitQuestion={() => {}}
            />
          </CardContent>
        </Card>
      </Container>
    </Dialog>
  );
};

export default QuestionItemPreview;
