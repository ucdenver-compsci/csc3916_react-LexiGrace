import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from "../actions/movieActions";
import { Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { Image } from 'react-bootstrap';
import ReviewForm from './reviewform';

class MovieDetail extends Component {
    componentDidMount() {
        const { dispatch, selectedMovie, movieId} = this.props;
        if (!selectedMovie) {
            dispatch(fetchMovie(movieId));
        }
    }

    render() {
        //need to include username
        const { selectedMovie, movieId, username } = this.props; 

        if (!selectedMovie) {
            return <div>Loading....</div>;
        }

        return (
            <Card>
                <Card.Header>Movie Detail</Card.Header>
                <Card.Body>
                    {selectedMovie.imageUrl && (
                        <Image className="image" src={selectedMovie.imageUrl} thumbnail />
                    )}
                    <ListGroup>
                        <ListGroupItem>{selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            {selectedMovie.actors && selectedMovie.actors.map((actor, i) => (
                                <p key={i}>
                                    <b>{actor.actorName}</b> {actor.characterName}
                                </p>
                            ))}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h4><BsStarFill/> {selectedMovie.avgRating}</h4>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h5>Reviews:</h5>
                            <Row>
                                {selectedMovie.movie_reviews && selectedMovie.movie_reviews.map((review, i) => (
                                    <Col key={i} xs={12} sm={6} md={4} lg={3}>
                                        <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                            <p style={{ fontWeight: 'bold' }}>{review.username}</p>
                                            <p>{review.review}</p>
                                            <p><BsStarFill /> {review.rating}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                <Card.Body>
                    <h5>Leave a Review</h5>
                    <ReviewForm movieId={movieId} username={username} />
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.movieId,
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(MovieDetail);