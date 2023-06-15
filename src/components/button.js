import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

export default function Button({loading, buttonClass, buttonText, spinColor, spinSize, type}){

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: ${spinColor};
    `;
    
    return(
        <button type={type} className={buttonClass} disabled={loading}>
            {!loading ? (
                <>{buttonText}</>
            ):(
            <div className="sweet-loading">
                <ClipLoader
                    css={override}
                    size={spinSize}
                    loading={loading}
                />
            </div>

            )}
        </button>
    )
} 