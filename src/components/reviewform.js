
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addReview } from '../actions/reviewActions';

const ReviewForm = ({ movieId, username }) => { //including username prop too 
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        rating: '',
        review: ''
    });
    const [error, setError] = useState('');

    const { rating, review } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        if (!rating || !review) {
            setError('Please provide a rating and a review.');
        } else {
            console.log('Submitting review:', { movieId, username, rating, review });
            dispatch(addReview(movieId, { username, rating, review }));
            setFormData({ rating: '', review: '' });
            setError('');
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                    type="number"
                    name="rating"
                    value={rating}
                    onChange={onChange}
                    min="1"
                    max="5"
                    required
                />
            </Form.Group>
            <Form.Group controlId="review">
                <Form.Label>Review</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="review"
                    value={review}
                    onChange={onChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default ReviewForm;
