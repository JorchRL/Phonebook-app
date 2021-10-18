import React from "react";

const Debug = ({ vars }) => {
    return (
        <div>
            <hr />
            <p style={{ margin: 0 }}>Debug</p>
            {vars.map((v) => (
                <p key={v.name} style={{ fontSize: "13px", margin: 0 }}>
                    {v.name}: {v.val}
                </p>
            ))}
            <hr />
        </div>
    );
};

export default Debug;
