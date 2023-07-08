import React from "react";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import "./About.css";
const About = () => {
    const visitLinkedin = () => {
        window.location = "https://www.linkedin.com/in/priyanshu1101/";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Me</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dz5o3j73z/image/upload/v1687894483/avatars/gxaoknfostu9fo2pndka.jpg"
                            alt="Founder"
                        />
                        <Typography>Priyanshu Bansal</Typography>
                        <Button onClick={visitLinkedin} color="primary" className="button">
                            Visit linkedin
                        </Button>
                        <span>
                            Hi! I'm Priyanshu Bansal, and I'm passionate about curating unique products
                            to enhance your shopping experience. Discover something special with us!
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Links</Typography>
                        <a
                            href="https://www.linkedin.com/in/priyanshu1101/"
                            target="blank"
                        >
                            <LinkedInIcon className="LinkedinIcon" />
                        </a>

                        <a href="https://github.com/priyanshu1101" target="blank">
                            <GitHubIcon className="GithubIcon" />
                        </a>

                        <a href="mailto:priyanshubansal35@gmail.com" target="blank">
                            <EmailIcon className="mailIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;