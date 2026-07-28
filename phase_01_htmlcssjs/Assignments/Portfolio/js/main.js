/**
 * CONSOLIDATED PORTFOLIO & CINEMATIC INTRO ENGINE
 * Intro Sequence Code: UNTOUCHED & INTACT
 * Parv Portfolio Inspired Design System (#050505 Obsidian & Electric Violet #8b5cf6)
 */

(function () {
    // --- 1. HORSE & RIDER ENGINE (UNTOUCHED) ---
    class HorseEngine {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.x = -350;
            this.y = 0;
            this.phase = 0;
            this.swingAngle = -Math.PI / 4;
            this.isSwinging = false;
            this.swingProgress = 0;
            this.hoofParticles = [];
        }

        update(dt, speedFactor = 1.0) {
            this.phase += 13.5 * speedFactor * dt;
            if (this.phase > Math.PI * 2) {
                this.phase -= Math.PI * 2;
            }

            if (this.isSwinging) {
                this.swingProgress += dt * 7.5 * speedFactor;
                if (this.swingProgress >= 1) this.swingProgress = 1;
                const easeSwing = Math.sin(this.swingProgress * Math.PI / 2);
                this.swingAngle = -Math.PI / 4 + easeSwing * (Math.PI * 1.1);
            }

            for (let i = this.hoofParticles.length - 1; i >= 0; i--) {
                const p = this.hoofParticles[i];
                p.x += p.vx * dt * 60;
                p.y += p.vy * dt * 60;
                p.alpha -= p.decay * dt * 60;
                if (p.alpha <= 0) this.hoofParticles.splice(i, 1);
            }
        }

        triggerSwing() {
            this.isSwinging = true;
            this.swingProgress = 0;
        }

        draw(groundY) {
            const ctx = this.ctx;
            this.y = groundY;

            const sinP = Math.sin(this.phase);
            const cosP = Math.cos(this.phase);
            const bodyLift = Math.abs(sinP) * -26;
            const spineTilt = sinP * 0.12;
            const horseCenterY = this.y - 145 + bodyLift;
            const horseCenterX = this.x;

            this.drawHoofParticles(ctx);

            ctx.save();
            this.drawHorseAndRider(ctx, horseCenterX, horseCenterY, sinP, cosP, spineTilt, false);
            ctx.restore();
        }

        drawHorseAndRider(ctx, cx, cy, sinP, cosP, spineTilt, isReflection = false) {
            ctx.save();
            ctx.translate(cx, cy);

            const rimColor = isReflection ? "rgba(140, 160, 190, 0.15)" : "rgba(255, 255, 255, 0.85)";

            const backLeftAngle = Math.sin(this.phase) * 1.35 + 0.20;
            const backRightAngle = Math.sin(this.phase + 0.45) * 1.25 + 0.25;
            const frontLeftAngle = Math.sin(this.phase + Math.PI) * 1.40;
            const frontRightAngle = Math.sin(this.phase + Math.PI + 0.5) * 1.30;

            this.drawLeg(ctx, -70, 20, backLeftAngle, true, rimColor, isReflection);
            this.drawLeg(ctx, 60, 20, frontLeftAngle, false, rimColor, isReflection);

            ctx.beginPath();
            ctx.ellipse(0, 0, 110, 55, spineTilt, 0, Math.PI * 2);
            const torsoGrad = ctx.createLinearGradient(-105, -48, 105, 48);
            torsoGrad.addColorStop(0, "#0a0a0d");
            torsoGrad.addColorStop(0.5, "#15151c");
            torsoGrad.addColorStop(1, "#070709");
            ctx.fillStyle = torsoGrad;
            ctx.fill();

            if (!isReflection) {
                ctx.beginPath();
                ctx.ellipse(0, -53, 100, 6, spineTilt, Math.PI, Math.PI * 2);
                ctx.strokeStyle = rimColor;
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }

            const neckAngle = -0.62 + cosP * 0.12;
            ctx.save();
            ctx.translate(90, -24);
            ctx.rotate(neckAngle);

            ctx.beginPath();
            ctx.moveTo(0, 34);
            ctx.quadraticCurveTo(24, -58, 58, -86);
            ctx.lineTo(92, -75);
            ctx.quadraticCurveTo(48, 10, 0, 34);
            const neckGrad = ctx.createLinearGradient(0, -78, 92, 34);
            neckGrad.addColorStop(0, "#181822");
            neckGrad.addColorStop(1, "#08080a");
            ctx.fillStyle = neckGrad;
            ctx.fill();

            if (!isReflection) {
                ctx.beginPath();
                ctx.moveTo(0, -52);
                ctx.quadraticCurveTo(30, -68, 58, -86);
                ctx.strokeStyle = rimColor;
                ctx.lineWidth = 2.2;
                ctx.stroke();
            }

            ctx.save();
            ctx.translate(60, -86);
            ctx.rotate(0.35 + sinP * 0.07);

            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(44, -5);
            ctx.lineTo(40, 22);
            ctx.lineTo(0, 17);
            ctx.closePath();
            ctx.fillStyle = "#0a0a0d";
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-5, -12);
            ctx.lineTo(-2, -32);
            ctx.lineTo(7, -16);
            ctx.fillStyle = "#121218";
            ctx.fill();

            if (!isReflection) {
                ctx.strokeStyle = "rgba(220, 235, 255, 0.7)";
                ctx.lineWidth = 1.2;
                for (let m = 0; m < 6; m++) {
                    ctx.beginPath();
                    ctx.moveTo(-10 - m * 8, -5);
                    const windOffset = Math.sin(this.phase + m) * 16 - 30;
                    ctx.quadraticCurveTo(-25 - m * 8, -35 + windOffset, -48 - m * 10, -10);
                    ctx.stroke();
                }
            }
            ctx.restore();
            ctx.restore();

            this.drawLeg(ctx, -60, 20, backRightAngle, true, rimColor, isReflection);
            this.drawLeg(ctx, 80, 20, frontRightAngle, false, rimColor, isReflection);

            if (!isReflection) {
                ctx.save();
                ctx.translate(-105, -24);
                ctx.strokeStyle = "rgba(200, 215, 245, 0.8)";
                ctx.lineWidth = 2.0;
                for (let t = 0; t < 7; t++) {
                    ctx.beginPath();
                    ctx.moveTo(0, t * 2);
                    const tailWave1 = Math.sin(this.phase - t * 0.4) * 28 - 55;
                    const tailWave2 = Math.cos(this.phase - t * 0.4) * 20 + 26;
                    ctx.bezierCurveTo(-38, -14 + tailWave1, -72, tailWave2, -112 - t * 5, 24 + t * 4);
                    ctx.stroke();
                }
                ctx.restore();
            }

            this.drawRider(ctx, -5, -48, rimColor, isReflection);
            ctx.restore();
        }

        drawLeg(ctx, attachX, attachY, angle, isHind, rimColor, isReflection) {
            ctx.save();
            ctx.translate(attachX, attachY);
            ctx.rotate(angle);

            const upperLen = isHind ? 80 : 72;
            const lowerLen = isHind ? 68 : 60;
            const hoofLen = 15;

            ctx.beginPath();
            ctx.moveTo(-14, 0);
            ctx.lineTo(14, 0);
            ctx.lineTo(10, upperLen);
            ctx.lineTo(-8, upperLen);
            ctx.closePath();
            ctx.fillStyle = "#0c0c10";
            ctx.fill();

            ctx.translate(0, upperLen);
            const jointAngle = isHind ? -Math.abs(angle * 1.18) : Math.abs(angle * 0.98);
            ctx.rotate(jointAngle);

            ctx.beginPath();
            ctx.moveTo(-8, 0);
            ctx.lineTo(8, 0);
            ctx.lineTo(6, lowerLen);
            ctx.lineTo(-6, lowerLen);
            ctx.closePath();
            ctx.fillStyle = "#070709";
            ctx.fill();

            if (!isReflection) {
                ctx.beginPath();
                ctx.moveTo(6, 0);
                ctx.lineTo(4, lowerLen);
                ctx.strokeStyle = rimColor;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            ctx.translate(0, lowerLen);
            ctx.beginPath();
            ctx.moveTo(-7, 0);
            ctx.lineTo(7, 0);
            ctx.lineTo(9, hoofLen);
            ctx.lineTo(-8, hoofLen);
            ctx.closePath();
            ctx.fillStyle = "#181820";
            ctx.fill();

            if (!isReflection && Math.abs(angle) > 0.6) {
                if (this.hoofParticles.length < 28 && Math.random() < 0.4) {
                    this.hoofParticles.push({
                        x: this.x + attachX + (upperLen + lowerLen) * Math.sin(angle),
                        y: this.y,
                        vx: -2 + Math.random() * -3,
                        vy: -1 - Math.random() * 2,
                        alpha: 0.8,
                        decay: 0.04
                    });
                }
            }
            ctx.restore();
        }

        drawRider(ctx, saddleX, saddleY, rimColor, isReflection) {
            ctx.save();
            ctx.translate(saddleX, saddleY);
            ctx.rotate(0.45);

            ctx.fillStyle = "#030304";
            ctx.strokeStyle = rimColor;

            ctx.beginPath();
            ctx.moveTo(0, 10);
            ctx.lineTo(18, 48);
            ctx.lineTo(10, 72);
            ctx.lineTo(2, 68);
            ctx.lineTo(8, 45);
            ctx.lineTo(-8, 10);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-14, 10);
            ctx.quadraticCurveTo(-18, -25, -10, -55);
            ctx.lineTo(14, -50);
            ctx.quadraticCurveTo(18, -20, 10, 10);
            ctx.closePath();
            ctx.fill();

            if (!isReflection) {
                ctx.beginPath();
                ctx.moveTo(-14, 10);
                ctx.quadraticCurveTo(-18, -25, -10, -55);
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            ctx.save();
            ctx.translate(2, -62);
            ctx.beginPath();
            ctx.ellipse(0, 0, 13, 15, -0.1, 0, Math.PI * 2);
            ctx.fill();
            if (!isReflection) {
                ctx.beginPath();
                ctx.arc(0, 0, 14, -Math.PI * 0.8, -Math.PI * 0.1);
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }
            ctx.restore();

            ctx.beginPath();
            ctx.moveTo(12, -45);
            ctx.lineTo(28, -25);
            ctx.lineTo(38, -15);
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#030304";
            ctx.stroke();

            ctx.save();
            ctx.translate(8, -45);
            ctx.rotate(this.swingAngle);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(20, 15);
            ctx.lineWidth = 7;
            ctx.strokeStyle = "#040405";
            ctx.stroke();

            const shaftLength = 155;
            ctx.beginPath();
            ctx.moveTo(18, 12);
            ctx.lineTo(18, 12 + shaftLength);
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = isReflection ? "rgba(200, 220, 255, 0.4)" : "#ffffff";
            ctx.stroke();

            ctx.save();
            ctx.translate(18, 12 + shaftLength);
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
                ctx.roundRect(-14, -3, 28, 7, 3);
            } else {
                ctx.rect(-14, -3, 28, 7);
            }
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.restore();

            ctx.restore();
            ctx.restore();
        }

        drawHoofParticles(ctx) {
            ctx.save();
            for (const p of this.hoofParticles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 235, 255, ${p.alpha})`;
                ctx.shadowColor = "#ffffff";
                ctx.shadowBlur = 6;
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // --- 2. INTRO CONTROLLER & SEAMLESS IMPACT REVEAL ENGINE (UNTOUCHED) ---
    function startEngine() {
        const canvas = document.getElementById("introCanvas");
        const introContainer = document.getElementById("introContainer");
        const textContainer = document.getElementById("textContainer");
        const textA = document.getElementById("glowingTextA");
        const textB = document.getElementById("glowingTextB");
        const portfolio = document.getElementById("portfolioApp");

        if (!canvas || !introContainer) return;

        const ctx = canvas.getContext("2d");
        let horseEngine;
        let lastTime = performance.now();

        const STATES = {
            HORSE_ACCELERATE: 0,
            BALL_APPEAR: 1,
            POLO_SWING: 2,
            BALL_ZOOM: 3,
            WHITE_BLOOM: 4,
            MULTILINGUAL_TEXT: 5,
            PORTFOLIO_REVEAL: 6
        };

        let currentState = STATES.HORSE_ACCELERATE;
        let stateTime = 0;
        let slowMoFactor = 1.0;
        let lineAlpha = 1.0;

        let ball = {
            x: 0,
            y: 0,
            z: 1,
            radius: 8,
            vz: 180,
            isLaunching: false,
            hasImpacted: false
        };

        let bloomFrame = 0;
        let sequenceStarted = false;

        const greetingsList = [
            { text: "WELCOME", font: "'Inter', sans-serif" },
            { text: "स्वागत है", font: "'Noto Sans Devanagari', sans-serif" },
            { text: "ਜੀ ਆਇਆਂ ਨੂੰ", font: "'Noto Sans Gurmukhi', sans-serif" },
            { text: "स्वागतम्", font: "'Noto Sans Devanagari', sans-serif" }
        ];

        function resizeCanvas() {
            canvas.width = window.innerWidth || document.documentElement.clientWidth || 1280;
            canvas.height = window.innerHeight || document.documentElement.clientHeight || 720;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        horseEngine = new HorseEngine(canvas, ctx);
        horseEngine.x = -350;

        let groundY = canvas.height * 0.68;
        let centerX = canvas.width / 2;

        introContainer.addEventListener("click", () => {
            transitionToPortfolio();
        });

        function drawMinimalGroundLine(ctx, gY, alpha) {
            if (alpha <= 0) return;

            ctx.save();
            ctx.globalAlpha = alpha;
            const lineGrad = ctx.createLinearGradient(0, gY, canvas.width, gY);
            lineGrad.addColorStop(0, "rgba(40, 40, 45, 0)");
            lineGrad.addColorStop(0.15, "rgba(40, 40, 45, 0.85)");
            lineGrad.addColorStop(0.85, "rgba(40, 40, 45, 0.85)");
            lineGrad.addColorStop(1, "rgba(40, 40, 45, 0)");

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, gY);
            ctx.lineTo(canvas.width, gY);
            ctx.stroke();
            ctx.restore();
        }

        function drawPoloBallAtRest(ctx, bx, by, opacity) {
            ctx.save();
            ctx.globalAlpha = opacity;
            const radius = 8;

            ctx.save();
            const shadowGrad = ctx.createRadialGradient(
                bx, by + radius * 0.9, 0,
                bx, by + radius * 0.9, radius * 1.4
            );
            shadowGrad.addColorStop(0, 'rgba(0,0,0,0.6)');
            shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.beginPath();
            ctx.ellipse(bx, by + radius * 0.9, radius * 1.1, radius * 0.28, 0, 0, Math.PI * 2);
            ctx.fillStyle = shadowGrad;
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
            ctx.shadowBlur = 15;

            ctx.beginPath();
            ctx.arc(bx, by, radius, 0, Math.PI * 2);

            const ballGrad = ctx.createRadialGradient(
                bx - radius * 0.35, by - radius * 0.35, radius * 0.05,
                bx, by, radius
            );
            ballGrad.addColorStop(0, '#ffffff');
            ballGrad.addColorStop(0.3, '#f0f0ee');
            ballGrad.addColorStop(0.8, '#c8c8c4');
            ballGrad.addColorStop(1, '#909090');

            ctx.fillStyle = ballGrad;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(bx - radius * 0.15, by, radius * 0.85, -0.6, 0.8);
            ctx.strokeStyle = "rgba(180, 180, 175, 0.4)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(bx + radius * 0.1, by - radius * 0.1, radius * 0.8, 1.2, 2.6);
            ctx.strokeStyle = "rgba(180, 180, 175, 0.35)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            ctx.restore();
            ctx.restore();
        }

        function drawZoomingBall(ctx) {
            const currentRadius = ball.radius * (1 + ball.z * 0.12);
            const bx = ball.x;
            const by = ball.y;

            for (let i = 3; i >= 1; i--) {
                const trailRadius = currentRadius * (1 - i * 0.08);
                const trailAlpha = 0.12 - i * 0.03;
                const trailX = bx - Math.sin((ball.z - i * 3) * 0.1) * 0.9;
                const trailY = by + i * 1.5;

                ctx.save();
                ctx.globalAlpha = trailAlpha;
                ctx.beginPath();
                ctx.arc(trailX, trailY, trailRadius, 0, Math.PI * 2);
                ctx.fillStyle = "#f0f0ee";
                ctx.fill();
                ctx.restore();
            }

            ctx.save();
            const bloomAmount = Math.min(80, 15 + (ball.z / 85) * 65);
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = bloomAmount;

            ctx.beginPath();
            ctx.arc(bx, by, currentRadius, 0, Math.PI * 2);

            const ballGrad = ctx.createRadialGradient(
                bx - currentRadius * 0.35, by - currentRadius * 0.35, currentRadius * 0.05,
                bx, by, currentRadius
            );
            ballGrad.addColorStop(0, '#ffffff');
            ballGrad.addColorStop(0.3, '#f0f0ee');
            ballGrad.addColorStop(0.8, '#c8c8c4');
            ballGrad.addColorStop(1, '#909090');

            ctx.fillStyle = ballGrad;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(bx - currentRadius * 0.15, by, currentRadius * 0.85, -0.6, 0.8);
            ctx.strokeStyle = "rgba(180, 180, 175, 0.4)";
            ctx.lineWidth = Math.max(0.8, currentRadius * 0.06);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(bx + currentRadius * 0.1, by - currentRadius * 0.1, currentRadius * 0.8, 1.2, 2.6);
            ctx.strokeStyle = "rgba(180, 180, 175, 0.35)";
            ctx.lineWidth = Math.max(0.8, currentRadius * 0.06);
            ctx.stroke();

            ctx.restore();
        }

        function animate(currentTime) {
            groundY = canvas.height * 0.68;
            centerX = canvas.width / 2;

            const dt = Math.min((currentTime - lastTime) / 1000, 0.05) * slowMoFactor;
            lastTime = currentTime;
            stateTime += dt;

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (currentState < STATES.MULTILINGUAL_TEXT) {
                drawMinimalGroundLine(ctx, groundY, lineAlpha);
            }

            const GallopSpeed = 780;
            horseEngine.x += GallopSpeed * dt;
            horseEngine.update(dt, 1.35);

            switch (currentState) {
                case STATES.HORSE_ACCELERATE:
                    horseEngine.draw(groundY);

                    if (horseEngine.x >= centerX - 140) {
                        currentState = STATES.BALL_APPEAR;
                        stateTime = 0;
                        ball.x = centerX + 20;
                        ball.y = groundY - 15;
                    }
                    break;

                case STATES.BALL_APPEAR:
                    horseEngine.draw(groundY);
                    drawPoloBallAtRest(ctx, centerX + 20, groundY - 15, Math.min(1.0, stateTime * 8));

                    if (stateTime > 0.12) {
                        currentState = STATES.POLO_SWING;
                        stateTime = 0;
                        slowMoFactor = 0.28;
                        horseEngine.triggerSwing();
                    }
                    break;

                case STATES.POLO_SWING:
                    horseEngine.draw(groundY);
                    drawPoloBallAtRest(ctx, centerX + 20, groundY - 15, 1.0);

                    if (horseEngine.swingProgress > 0.45) {
                        currentState = STATES.BALL_ZOOM;
                        stateTime = 0;
                        slowMoFactor = 1.0;
                        ball.isLaunching = true;
                    }
                    break;

                case STATES.BALL_ZOOM:
                    if (horseEngine.x < canvas.width + 450) {
                        horseEngine.draw(groundY);
                    }

                    ball.z += ball.vz * dt;
                    ball.x += (centerX - ball.x) * 0.04;
                    ball.y += (canvas.height * 0.46 - ball.y) * 0.04;

                    drawZoomingBall(ctx);

                    if (ball.z >= 85) {
                        ball.hasImpacted = true;
                        currentState = STATES.WHITE_BLOOM;
                        stateTime = 0;
                        bloomFrame = 0;
                        sequenceStarted = false;
                    }
                    break;

                case STATES.WHITE_BLOOM:
                    bloomFrame++;

                    if (bloomFrame <= 3) {
                        const radiusProgress = bloomFrame / 3;
                        const bloomRadius = canvas.width * 0.8 * radiusProgress;

                        ctx.save();
                        const bGrad = ctx.createRadialGradient(
                            centerX, canvas.height * 0.46, 0,
                            centerX, canvas.height * 0.46, bloomRadius
                        );
                        bGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
                        bGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.85)');
                        bGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                        ctx.fillStyle = bGrad;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.restore();
                    }
                    else if (bloomFrame <= 8) {
                        ctx.save();
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.restore();
                    }
                    else {
                        const fadeFrame = bloomFrame - 8;
                        const bloomAlpha = Math.max(0, 0.95 - fadeFrame * 0.052);
                        const recedingRadius = Math.max(10, canvas.width * 0.8 * (1 - fadeFrame / 18));

                        if (bloomAlpha > 0) {
                            ctx.save();
                            const bGrad = ctx.createRadialGradient(
                                centerX, canvas.height * 0.46, 0,
                                centerX, canvas.height * 0.46, recedingRadius
                            );
                            bGrad.addColorStop(0, `rgba(255, 255, 255, ${bloomAlpha})`);
                            bGrad.addColorStop(0.8, `rgba(255, 255, 255, ${bloomAlpha * 0.6})`);
                            bGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                            ctx.fillStyle = bGrad;
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.restore();
                        }

                        if (!sequenceStarted) {
                            sequenceStarted = true;
                            startMultilingualSequence();
                        }

                        if (bloomAlpha <= 0) {
                            currentState = STATES.MULTILINGUAL_TEXT;
                        }
                    }

                    lineAlpha = Math.max(0, lineAlpha - dt * 3.0);
                    break;

                case STATES.MULTILINGUAL_TEXT:
                    break;

                case STATES.PORTFOLIO_REVEAL:
                    break;
            }

            if (currentState !== STATES.PORTFOLIO_REVEAL) {
                requestAnimationFrame(animate);
            }
        }

        function startMultilingualSequence() {
            if (!textContainer || !textA || !textB) return;

            textContainer.classList.remove("hidden");
            let index = 0;
            let currentElem = textA;
            let nextElem = textB;

            function showWord() {
                if (index < greetingsList.length) {
                    const item = greetingsList[index];
                    currentElem.style.fontFamily = item.font;
                    currentElem.textContent = item.text;

                    currentElem.style.animation = "none";
                    void currentElem.offsetHeight;
                    currentElem.style.animation = "crossfadeIn 0.42s cubic-bezier(0.25, 1, 0.5, 1) forwards";

                    const activeElem = currentElem;

                    setTimeout(() => {
                        activeElem.style.animation = "crossfadeOut 0.42s cubic-bezier(0.25, 1, 0.5, 1) forwards";
                    }, 550);

                    index++;

                    const temp = currentElem;
                    currentElem = nextElem;
                    nextElem = temp;

                    setTimeout(showWord, 550);
                } else {
                    setTimeout(transitionToPortfolio, 450);
                }
            }

            showWord();
        }

        function transitionToPortfolio() {
            currentState = STATES.PORTFOLIO_REVEAL;

            if (introContainer) {
                introContainer.style.transition = "opacity 0.8s ease";
                introContainer.style.opacity = "0";
            }

            if (portfolio) {
                portfolio.classList.remove("hidden");
                portfolio.style.opacity = "1";
            }

            setTimeout(() => {
                if (introContainer) introContainer.style.display = "none";
                initPortfolioFeatures();
            }, 800);
        }

        requestAnimationFrame(animate);
    }

    // --- 3. PORTFOLIO INTERACTIVITY FEATURES ---
    function initPortfolioFeatures() {
        // 1. Hero Sequenced Fade-In
        const subheading = document.getElementById("heroSubheading");
        const description = document.getElementById("heroDescription");
        const actions = document.getElementById("heroActions");

        setTimeout(() => { if (subheading) subheading.classList.add("hero-element-visible"); }, 200);
        setTimeout(() => { if (description) description.classList.add("hero-element-visible"); }, 450);
        setTimeout(() => { if (actions) actions.classList.add("hero-element-visible"); }, 700);

        // 2. Custom Cursor Follower with Lerp Smoothing
        const cursor = document.getElementById("cursorFollower");
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function renderCursor() {
            cursorX += (mouseX - cursorX) * 0.12;
            cursorY += (mouseY - cursorY) * 0.12;
            if (cursor) {
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            }
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        // 3. Magnetic Buttons Proximity Effect (80px radius)
        const magneticBtns = document.querySelectorAll(".magnetic-btn");
        window.addEventListener("mousemove", (e) => {
            magneticBtns.forEach(btn => {
                const rect = btn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - btnX, e.clientY - btnY);

                if (dist < 80) {
                    const dx = (e.clientX - btnX) * 0.3;
                    const dy = (e.clientY - btnY) * 0.3;
                    btn.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
                } else {
                    btn.style.transform = `translate3d(0, 0, 0)`;
                }
            });
        });

        // 4. IntersectionObserver for Scroll Reveal & Stat Count-Up
        const observerOptions = { threshold: 0.2 };
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll(".scroll-reveal").forEach(el => revealObserver.observe(el));

        // 3D Gyroscope/Tilt Animation for Animated Photo Card
        const photoWrapper = document.querySelector(".about-animated-photo-wrapper");
        const photoCard = document.querySelector(".photo-card");
        if (photoWrapper && photoCard) {
            photoWrapper.addEventListener("mousemove", (e) => {
                const rect = photoWrapper.getBoundingClientRect();
                const cardX = e.clientX - rect.left - rect.width / 2;
                const cardY = e.clientY - rect.top - rect.height / 2;
                const rotateX = (-cardY / (rect.height / 2)) * 14;
                const rotateY = (cardX / (rect.width / 2)) * 14;
                photoCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            });

            photoWrapper.addEventListener("mouseleave", () => {
                photoCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
            });
        }

        // Stat Count-Up
        const statsPanel = document.querySelector(".about-stats-grid") || document.querySelector(".about-stats");
        let statsDone = false;

        if (statsPanel) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !statsDone) {
                        statsDone = true;
                        animateStats();
                    }
                });
            }, observerOptions);
            statsObserver.observe(statsPanel);
        }

        function animateStats() {
            const numbers = document.querySelectorAll(".about-stat-number[data-target]");
            numbers.forEach(el => {
                const target = parseFloat(el.getAttribute("data-target"));
                const duration = 1500;
                const startTime = performance.now();
                const isFloat = target % 1 !== 0;

                function updateCount(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(1, elapsed / duration);
                    const current = progress * target;
                    el.textContent = isFloat ? current.toFixed(2) : (Math.floor(current) + "+");

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = isFloat ? target.toFixed(2) : (target + "+");
                    }
                }
                requestAnimationFrame(updateCount);
            });
        }

        // Project Cards Reveal
        const projectCards = document.querySelectorAll(".projects-card");
        projectCards.forEach((card, index) => {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.classList.add("project-visible");
                        }, index * 100);
                        cardObserver.unobserve(card);
                    }
                });
            }, observerOptions);
            cardObserver.observe(card);
        });

        // 5. Project Filters
        const filterButtons = document.querySelectorAll(".projects-filter");

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                projectCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filterValue === "all" || category === filterValue) {
                        card.style.display = "block";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "translateY(0)";
                        }, 50);
                    } else {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(20px)";
                        setTimeout(() => {
                            card.style.display = "none";
                        }, 300);
                    }
                });
            });
        });

        // 6. Project Modal Dialog Popup (Exact Resume Data)
        const modal = document.getElementById("projectModal");
        const modalTitle = document.getElementById("modalTitle");
        const modalSubtitle = document.getElementById("modalSubtitle");
        const modalImage = document.getElementById("modalImage");
        const modalCategory = document.getElementById("modalCategory");
        const modalDescription = document.getElementById("modalDescription");
        const modalFeatures = document.getElementById("modalFeatures");
        const modalTech = document.getElementById("modalTech");
        const closeModal = document.querySelector(".close-modal");

        const projectData = {
            1: {
                title: "RevRoots",
                subtitle: "Movie Discovery, Ratings, Genre Filtering & Ticket Booking",
                category: "FULL STACK &bull; LIVE ON RENDER",
                image: "assets/project1.jpg",
                description: "Comprehensive movie platform where users browse featured titles (e.g. Superman), watch trailers, rate and comment on movies, explore dedicated genre categories (Superhero, Action, Drama, etc.), and perform dynamic seat selection & ticket booking with Razorpay webhook payment verification across 5 normalized MySQL database models (movies, theaters, shows, bookings, users). Designed a hybrid backend combining Django ORM for relational data management with Flask microservices for lightweight API endpoints.",
                features: ["Movie Browsing & Trailer Integration", "User Ratings & Interactive Comments", "Genre & Category Navigation", "Dynamic Seat Selection & Booking", "Razorpay Webhook Verification", "Hybrid Django/Flask Architecture", "Live Deployed on Render"],
                tech: ["Django", "Flask", "Python", "MySQL", "Razorpay API", "Render", "HTML/CSS/JS"]
            },
            2: {
                title: "MediColl",
                subtitle: "AI Medical Assistance Platform",
                category: "AI & HEALTHCARE",
                image: "assets/project3.jpg",
                description: "Built and deployed a full-stack AI healthcare platform where patients describe symptoms and receive medical guidance via a locally running LLaMA 3 model (Ollama), keeping all patient data fully on-device for privacy compliance. Engineered a real-time nearest-hospital detection system using Leaflet.js for interactive mapping and the OSRM API for route optimization, delivering turn-by-turn emergency navigation.",
                features: ["On-Device LLaMA 3 Inference (Ollama)", "Nearest Hospital Detection & Navigation", "Turn-by-Turn Route Optimization (OSRM)", "Symptom-Medicine Recommendation Engine", "JWT Persistent Record Security"],
                tech: ["Django", "Python", "MySQL", "Ollama", "LLaMA 3", "Leaflet.js", "OSRM API", "JWT"]
            },
            3: {
                title: "Bank Trend Predictor",
                subtitle: "ML Financial Signal System",
                category: "ML & FINANCIAL ENGINEERING",
                image: "assets/project2.jpg",
                description: "Developed a production-grade ML pipeline predicting 5-day directional price trends for 10 major Indian banking stocks (NSE), enriched with macroeconomic signals from Bank Nifty, Nifty 50, USD/INR, and India VIX. Engineered 30+ technical features spanning trend, momentum, volatility, and volume categories – including RSI-14, MACD, Bollinger Bands, ATR%, and Stochastic %K/%D.",
                features: ["30+ Engineered Technical Indicators", "Macroeconomic Signal Integration", "Walk-Forward Time-Series Validation", "Zero Data Leakage Pipeline", "70–73% Directional Accuracy", "Paper-Trading Backtest (INR 1,00,000)"],
                tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "LightGBM", "yfinance"]
            }
        };

        document.querySelectorAll(".view-project-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const card = btn.closest(".projects-card");
                const id = card ? card.getAttribute("data-id") : null;
                const data = projectData[id];

                if (data && modal) {
                    modalTitle.textContent = data.title;
                    modalSubtitle.textContent = data.subtitle;
                    modalCategory.innerHTML = data.category;
                    modalImage.src = data.image;
                    modalDescription.textContent = data.description;

                    modalFeatures.innerHTML = "";
                    data.features.forEach(f => {
                        const pill = document.createElement("span");
                        pill.className = "skills-tag";
                        pill.textContent = f;
                        modalFeatures.appendChild(pill);
                    });

                    modalTech.innerHTML = "";
                    data.tech.forEach(t => {
                        const tag = document.createElement("span");
                        tag.className = "projects-card-tag";
                        tag.textContent = t;
                        modalTech.appendChild(tag);
                    });

                    modal.classList.add("open");
                }
            });
        });

        if (closeModal) {
            closeModal.addEventListener("click", () => {
                if (modal) modal.classList.remove("open");
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("open");
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startEngine);
    } else {
        startEngine();
    }
})();
