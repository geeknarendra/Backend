Practice Redis:
Channel

# basic

    SUBCRIBE channelName                  // for creating channel
    PUBLISH channelName "message"        // to send message to SUBCRIBE channel

#for pattern channel
PSUBCRIBE letter*
// here we can give any pattern, for example
PSUBCRIBE d* , in this case PUBLISH which ever channel start with d,
data come here
Stream
Helps to store the history

Syntax:
XADD streamName id key value
example: 1. XADD mystream 1000 name Anna

    2. XADD mystream * name Bert
    // * give random id as timestamp

    3. XADD mystream MAXLEN 10000 * name Cathy
    // if len is greater than maxelen
    as a stack top data deleted and new data add in top

# to list all stream

    SCAN 0 TYPE stream

# list all stream data

    XREAD COUNT dataCount STREAMS streamName startingIndex/startingID

example:
XREAD COUNT 200 STREAMS mystream 0

# control stream closeing time

    XREAD BLOCK timeInMS STREAMS streamName 0

example:
XREAD BLOCK 100000 STREAMS mystream 0
// here if no data is sent 10s the stream is closed

    XREAD BLOCK 0 STREAMS mystream 0
    // here the stream never end

    XREAD BLOCK 100000 STREAMS mystream $
    // here it wait for 100000 consantly, if no data sent
    the strem closed automatically

# Loop

    # forward
    XRANGE streamName startingID endID

example:
XRANGE mystream 1000-0 1000-10
// list all data in the range

    XRANGE mystream 1000-0 1000-10 COUNT 5
    // list 5 data in the range

    XRANGE mystream + -
    // if don't know the id, we can use this it's give all data

    XRANGE mystream + - COUNT 5
    // give first 5 data

    ## reverse
    XREVRANGE streamName + -
