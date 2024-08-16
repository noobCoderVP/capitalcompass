'use client'
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Container,
  Button,
} from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/news.css';
import axios from 'axios';

const NewsData = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEPATH}/news`);
      console.log(response.data);
      setNews(JSON.parse(response.data.data).articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Container className={styles.container}>
      <Typography variant="h4" gutterBottom align="center">
        Explore Latest Stock Market News
      </Typography>

      <div className={styles.newsGrid}>
        {news.map(({ title, url, urlToImage, publishedAt, source, description }) => (
          <Card key={url} className={styles.card} style={{marginTop: '20px'}}>
            <Link href={url} passHref>
              <CardMedia
                className={styles.cardMedia}
                component="img"
                image={urlToImage}
                alt={title}
              />
            </Link>
            <CardContent className={styles.cardContent}>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
            <CardActions className={styles.cardActions}>
              <Button
                size="small"
                variant="contained"
                className={styles.buttonPrimary}
              >
                {source.name}
              </Button>
              <Button
                size="small"
                variant="outlined"
                className={styles.buttonSecondary}
              >
                {new Date(publishedAt).toLocaleDateString()}
              </Button>
              <Link href={url} passHref>
                <Button
                  size="small"
                  variant="contained"
                  className={styles.buttonPrimary}
                >
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default NewsData;
