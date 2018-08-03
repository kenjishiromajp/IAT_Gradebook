import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Card, Icon, Row } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../../components/Icons/Logo';
import svg from './imgs/illustration.svg';
import './style.less';

const LandingPage = () => (
  <div>
    <Helmet>
      <title>IAT - Landing Page</title>
    </Helmet>
    <main className="banner">
      <div className="container">
        <div className="wrapper">
          <Logo negative />
          <Card>
            <Row type="flex" align="middle">
              <div>
                <img className="illustration-1" src={svg} />
              </div>
              <div style={{ flex: 1 }}>
                <h1>Hi there!</h1>
                <p>
                  Here you can give the grade for your students, and after that
                  you must wait for approve of principal.
                </p>
                <Row>
                  <Link to="/gradebook">
                    <Button type="primary">
                      <Icon type="book" />See your GradeBook
                    </Button>
                  </Link>
                </Row>
              </div>
            </Row>
          </Card>
        </div>
      </div>
    </main>
  </div>
);
export default LandingPage;
