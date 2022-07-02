---
layout: post
title: "Paper Summary: Depth Completion with Twin Surface Extrapolation at Occlusion Boundaries"
tags: [Linux,Python]

---
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});
</script>
<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_HTML">
</script>
<ul id="toc"></ul>

---

<div id="" style="text-align: center;" markdown="1">
__Part of the contents are abstracted from original paper.__
</div>

<div id="" style="text-align: justify;" markdown="1">
This article details elegant design of twin-surface extrapolation from imransai. We will step-by-step deriving formula and show why this design works.
</div>

---

### Goal of Depth Completion Task

<a id="fig1"></a>
{% include image.html
   img="/data/twin_surface/goal.png"
   caption="Fig. 1, Depth completion task."
%}

<div id="" style="text-align: justify;" markdown="1">
Depth completion starts from a sparse set of known depth values and estimates the unknown depths for the remaining image pixels.
</div>

---

### Challenges
+ Recovering depth discontinuity is that pixels at boundary regions suffer from ambiguity as to whether they belong to a foreground depth or background depth.
	
	--> Propose a multi-hypothesis depth representation that explicitly models both foreground and background depths in the difficult occlusion-boundary regions.

<a id="fig2"></a>
{% include image.html
   img="/data/twin_surface/proposed.png"
   caption="Fig. 2, Illustration of proposed method."
%}


---

### Ambiguities in Depth Completion Task

<div id="" style="text-align: justify;" markdown="1">
Ambiguities have a significant impact on depth completion, and it is useful to have quantitative way to assess their impact. 
In this paper, we proposed using the expected loss to predict and explain the impact of ambguities on trained network.


**Simplifying Scene Assumption**

We make a further simplifying assumption in our analysis that there are at most binary ambiguities per pixel. 
A binary ambiguties is described by a pixel having probabilites $p\_1$ and $p\_2$ of depths $d\_1$ and $d\_2$ respectively. 
When $d\_1$ < $d\_2$ we call $d\_1$ the foreground depth and $d\_2$ the backfround depth.
</div>

---

### Modeling Assumption by Using Expected Loss
<div id="" style="text-align: justify;" markdown="1">
To assess the impact of ambiguties on the network, we build a quantitative model. Consider a single pixel whose has a prediction depth $d$. 
Next, assume that the pixel has a set of ambiguties, $d\_i$, each with probability $p\_i$. It means that each $d\_i$ may has a probability $p\_i$ act as ground truth depth. 
Then, we design the expected loss as a function of depths is:

$$E\{L(d)\}=\sum_i p_i L(d-d_i)$$

Since we have simplified assumption, so we get:

$$E\{L(d)\}=p_1 L(d-d_1) + p_2 L(d-d_2)$$

Note that expected loss expresses the optimization of training, it is used to predict the behavior of trained network at ambiguities, then justify the design of proposed method. 
You may also be confused about how to detemine $p\_i$, just keep in mind, we will talk about it later.
</div>


---

### Designing Loss Function
<div id="" style="text-align: justify;" markdown="1">
Loss function is a key component of depth completion. We propose to use two assymetric loss functions to learn foreground and background depth, 
and to use fusion loss to learn how to select/blend between foreground and background depth.


**Foreground and Background Estimators**

<a id="fig3"></a>
{% include image.html
   img="/data/twin_surface/ALE&RALE.png"
   caption="Fig. 3, Asymmetric Linear Error (ALE) and its twin."
%}

In this paper, we use a pair of error funtions as shown in <a href="#fig3">Fig.3</a>, which we call the Asymmetric Linear Error ($ALE$), and its twin, the Reflected Asymmetric Linear Error($RALE$), defined as:

$$ALE_{\gamma}=max(-\frac{1}{\gamma} \varepsilon, \gamma \varepsilon)$$

$$RALE_{\gamma}=max(\frac{1}{\gamma} \varepsilon, -\gamma \varepsilon)$$

Here $\varepsilon$ is the difference between the measurement and the ground truth, $\gamma$ is a parameter, and $max⁡(𝑎,𝑏)$ returns the larger of $𝑎$ and $𝑏$. 
Note that if $\gamma$ is replaced by $1/\gamma$, both the $ALE$ and $RALE$ are reflected. Thus, without loss of generality, in this work we restrict $\gamma \geq 1$.

To estimate the foreground depth, we propose to minimizing the mean $ALE$ over all pixels to obtain $\hat{d}_1$, the estimated foreground sufface. 
By examing expected $ALE$, we will know what as ideal network will predict.

The full expected $ALE$ loss will be:

$$E\{L(d)\}=E\{ALE_{\gamma}(\varepsilon)\}$$

$$=p_1 ALE_{\gamma}(d-d_1) + p_2 ALE_{\gamma}(d-d_2)$$

$$=p_1 max(-\frac{1}{\gamma} (d-d_1), \gamma (d-d_1)) + p_2 max(-\frac{1}{\gamma} (d-d_2), \gamma (d-d_2))$$


we obtain expected losses at ambiguities $d_1$ and $d_2$: 

$$E\{L(d_1)\}=p_1 max(-\frac{1}{\gamma} (d_1-d_1), \gamma (d_1-d_1)) + p_2 max(-\frac{1}{\gamma} (d_1-d_2), \gamma (d_1-d_2))$$

$$=p_2 (-\frac{1}{\gamma} (-(d_2-d_1))), \because d_1 < d_2 $$

$$=p_2 \frac{1}{\gamma} (d_2-d_1)$$

$$E\{L(d_2)\}=p_1 max(-\frac{1}{\gamma} (d_2-d_1), \gamma (d_2-d_1)) + p_2 max(-\frac{1}{\gamma} (d_2-d_2), \gamma (d_2-d_2))$$

$$=p_1 \gamma (d_2-d_1), \because d_1 < d_2 $$


To estimate foreground depth, it is straightforward to see that:

$$L(d_1)<L(d_2)$$

The equation is satisfied only when:

$$p_2 \frac{1}{\gamma} (d_2-d_1) < p_1 \gamma (d_2-d_1)$$

$$\gamma > \sqrt{\frac{p_2}{p_1}}  \qquad (Constraint \; 1)$$

The same analysis, to estimate the background depth, we propose to minimizing the mean $RALE$ over all pixels to obtain $\hat{d}_2$, the estimated background sufface. 
By examing Expected RALE, we get the same constraint on $\gamma$, except that the probability ration ins inverted.

The full expected $RALE$ loss will be:

$$E\{L(d)\}=E\{RALE_{\gamma}(\varepsilon)\}$$

$$=p_1 RALE_{\gamma}(d-d_1) + p_2 RALE_{\gamma}(d-d_2)$$

$$=p_1 max(\frac{1}{\gamma} (d-d_1), -\gamma (d-d_1)) + p_2 max(\frac{1}{\gamma} (d-d_2), -\gamma (d-d_2))$$


we obtain expected losses at ambiguities $d_1$ and $d_2$: 

$$E\{L(d_1)\}=p_1 max(\frac{1}{\gamma} (d_1-d_1), -\gamma (d_1-d_1)) + p_2 max(\frac{1}{\gamma} (d_1-d_2), -\gamma (d_1-d_2))$$

$$=p_2 \gamma (d_2-d_1), \because d_1 < d_2 $$

$$E\{L(d_2)\}=p_1 max(\frac{1}{\gamma} (d_2-d_1), -\gamma (d_2-d_1)) + p_2 max(\frac{1}{\gamma} (d_2-d_2), -\gamma (d_2-d_2))$$

$$=p_1 \frac{1}{\gamma} (d_2-d_1), \because d_1 < d_2 $$


To estimate background depth, it is straightforward to see that:

$$L(d_1)>L(d_2)$$

The equation is satisfied only when:

$$p_2 \gamma (d_2-d_1) > p_1 \frac{1}{\gamma} (d_2-d_1)$$

$$\gamma > \sqrt{\frac{p_1}{p_2}} \qquad (Constraint \; 2) $$

**Fused Depth Estimator**

We desire to have a fused depth predictor, and we know the foreground and background depth estimates provide lower and upper bounds on depth for each pixel. 
We express the final fused depth estimator $\hat{d}_t$ for the true depth $d_t$ as a weighted combination of the two depths:

$$\hat{d}_t = \sigma \hat{d}_1 + (1-\sigma) \hat{d}_2 $$

where $\sigma$ is an estimated value between $0$ and $1$. We use a mean absolute error as part of the fusion loss:

$$F(\sigma)=|\hat{d}_t-d_t|=|\sigma \hat{d}_1 + (1-\sigma) \hat{d}_2-d_t|$$

To estimate fused depth, we examing the loss below:

$$L(\sigma) = E\{F(\sigma)\} = p|\sigma \hat{d}_1 + (1-\sigma) \hat{d}_2-d_1| + (1-p)|\sigma \hat{d}_1 + (1-\sigma) \hat{d}_2-d_2|$$

Here, $p=p_1$, and $p_2=1-p$. This has a minimum at $\sigma=1$ when $𝑝>0.5$ and a minimum at $\sigma=0$ when $𝑝<0.5$, 
we also draw the hyperplane of $L(\sigma)$ in <a href="#fig4">Fig.4</a>, the optimize direction guides the model predict either foreground depth $d_1$ or background depth $d_2$.


<a id="fig4"></a>
{% include image.html
   img="/data/twin_surface/func_f.png"
   caption="Fig. 4, The hyperplane of $L(\sigma)$."
%}

</div>

---

### Depth representation
<div id="" style="text-align: justify;" markdown="1">
We have developed three separate loss function whose individual optimazations give us three separate components
of a final depth estimate for each pixel. Based on the characterization of our losses, we require a network to produce a 3-channel output. Then for simplicity we combine all loss functions into a single loss: 

$$L(c_1, c_2, c_3) = \frac{1}{N} \sum_{j}^{N}(ALE_{\gamma}(c_{1j}-d_1) + RALE_{\gamma}(c_{2j}-d_2) + F(s(c_{3j})))$$

Here $𝑐_{𝑖𝑗}$ refers to pixel $j$ of channel $i$, $s()$ is a Sigmoid function, and the mean is taken over all $𝑁$ pixels.
We interpret the output of these three channels for a trained network as 

$$𝑐_1 \rightarrow \hat{d}_1, 𝑐_2 \rightarrow \hat{d}_2, s(𝑐_3) \rightarrow \sigma$$

Now, let's see what happen here, we force $p_1$ to be $1$, $p_2$ to be $0$, which means the model learn to predict the depth $d$ with only considering foreground depth $d_1$ act as the ground truth depth $d_t$.
Given $p_1=1$, $p_2=0$ and $d=\hat{d}_1$:

$$E\{ALE_{\gamma}(\varepsilon)\}=p_1 ALE_{\gamma}(d-d_1) + p_2 ALE_{\gamma}(d-d_2)$$

$$=ALE_{\gamma}(\hat{d}_1-d_1)$$ 

By the same token, we have:

$$E\{RALE_{\gamma}(\varepsilon)\}=p_1 RALE_{\gamma}(d-d_1) + p_2 RALE_{\gamma}(d-d_2)$$

$$=RALE_{\gamma}(\hat{d}_2-d_2)$$

We can further interpret that when the pixel locate at the boundary of foreground and background, $ALE$ tend to guiding the model predict $\hat{d}_1$ to be foreground depth $d_1$.
Meanwhile, $RALE$ tend to guiding the model predict $\hat{d}_2$ to be background depth $d_2$. See <a href="#fig5">Fig.5</a>:

<a id="fig5"></a>
{% include image.html
   img="/data/twin_surface/dep_rep.png"
   caption="Fig. 5, Visualization of model behavior."
%}

Finally, we have:

$$L(c_1, c_2, c_3) = \frac{1}{N} \sum_{j}^{N}(ALE_{\gamma}(c_{1j}-d_t) + RALE_{\gamma}(c_{2j}-d_t) + F(s(c_{3j})))$$

Note that, by doing so, the mentioned $Constraints \;1\; and \;2$ are also satisfied. 
</div>

---

### Results

<a id="fig6"></a>
{% include image.html
   img="/data/twin_surface/cmp_sota.png"
   caption="Fig. 6, Comparison of proposed method with SoTA."
%}

<!--

<a id="fig7"></a>
{% include image.html
   img="/data/twin_surface/result_kitti.png"
   caption="Fig. 7, A complex human activity usually is sub-divided into unit-actions."
%}

<a id="fig8"></a>
{% include image.html
   img="/data/twin_surface/result_nyu.png"
   caption="Fig. 8, A complex human activity usually is sub-divided into unit-actions."
%}

**Ablation Study**


<a id="fig9"></a>
{% include image.html
   img="/data/twin_surface/ablation_loss_sigma.png"
   caption="Fig. 9, Effect of loss functions and $\sigma$."
%}

<a id="fig10"></a>
{% include image.html
   img="/data/twin_surface/ablation_gamma.png"
   caption="Fig. 10, Effect of $\gamma$ on performance."
%}

<a id="fig11"></a>
{% include image.html
   img="/data/twin_surface/ablation_row_sparsity.png"
   caption="Fig. 11, Effect of sparsity on depth performance."
%}

 -->
---
### Conclusions
+ This paper proposed a twin-surface representation that can estimate foreground, background and fused depth.
+ This paper adopt a pair of asymmetric loss functions to explicitly predict foreground-background object surfaces.

---

### References

[[1][Imran2021twin]]
Saif Imran, Xiaoming Liu, and Daniel Morris. Depth completion with twin surface extrapolation at occlusion boundaries. 
In CVPR, pages 2583–2592, 2021.

---

[Imran2021twin]: https://openaccess.thecvf.com/content/CVPR2021/papers/Imran_Depth_Completion_With_Twin_Surface_Extrapolation_at_Occlusion_Boundaries_CVPR_2021_paper.pdf