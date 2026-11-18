import React from "react";

const successStories = [
  {
    id: 1,
    name: "Priya Sharma",
    image: "", // leave empty to show icon
    role: "Software Engineer at Google",
    story:
      "From a small town to one of the biggest tech giants — Priya's journey is an inspiration for all alumni.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    image: "",
    role: "Data Scientist at Microsoft",
    story:
      "Rahul's passion for data led him to transform businesses and lives through machine learning.",
  },
  {
    id: 3,
    name: "Anjali Menon",
    image: "",
    role: "Founder, EduBridge",
    story:
      "Anjali built an ed-tech platform that connects rural students to quality education resources.",
  },
];

export default function SuccessStories() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🎉 Alumni Success Stories</h2>
      <p className="text-center mb-5">
        Get inspired by the incredible journeys of our alumni across industries.
      </p>

      <div className="row">
        {successStories.map((story) => (
          <div className="col-md-4 mb-4" key={story.id}>
            <div className="card h-100 shadow text-center" style={{ borderRadius: "15px" }}>
              
              {/* Profile Icon or Image */}
              {story.image ? (
                <img
                  src={story.image}
                  alt={story.name}
                  className="rounded-circle mx-auto mt-4"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "3px solid #ddd",
                  }}
                />
              ) : (
                <i
                  className="bi bi-person-circle text-secondary mt-4"
                  style={{ fontSize: "6rem" }}
                ></i>
              )}

              <div className="card-body">
                <h5 className="card-title">{story.name}</h5>
                <h6 className="text-muted">{story.role}</h6>
                <p className="card-text mt-2">{story.story}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  
 