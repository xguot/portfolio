import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

export type Lang = 'en' | 'zh';

type Dict = Record<string, unknown>;
type Entry = string | Dict;

function initialLang(): Lang {
	if (browser) {
		const stored = localStorage.getItem('lang');
		if (stored === 'zh' || stored === 'en') return stored;
		return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
	}
	return 'en';
}

export const lang = writable<Lang>(initialLang());

export function setLang(next: Lang) {
	lang.set(next);
	if (browser) {
		localStorage.setItem('lang', next);
		document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
	}
}

export function toggleLang() {
	setLang(get(lang) === 'zh' ? 'en' : 'zh');
}

function lookup(l: Lang, key: string): string {
	const keys = key.split('.');
	let node: Entry = dict[l];
	for (const k of keys) {
		if (typeof node === 'string') return node;
		const next: Entry | undefined = node[k] as Entry | undefined;
		if (next === undefined) return key;
		node = next;
	}
	return typeof node === 'string' ? node : key;
}

export const t = derived(lang, ($lang) => (key: string) => lookup($lang, key));

export const isZh = derived(lang, ($lang) => $lang === 'zh');

const dict: Record<Lang, Dict> = {
	en: {
		nav: {
			about: 'about',
			experience: 'experience',
			projects: 'projects'
		},
		tagline: 'A CS student who fancies quantum',
		subtitle: 'Undergraduate Researcher · Quantum Computing · CS @ UVA',
		about1:
			"I'm a CS undergrad at UVA working at the intersection of quantum information and computational imaging: reconstructing spectro-polarimetric datacubes from lensless speckle images with a conic-constrained ADMM solver — a problem formally isomorphic to quantum state tomography via the Poincaré-Bloch map — plus PRISM, a C++17 projected gradient descent engine, and RareEarth DB, a MongoDB-backed materials database with Fireworks DFT workflows on UVA HPC. I also contribute to stim, the quantum circuit simulator.",
		about2:
			"Away from the keyboard I do Muay Thai and hang out with my Sheltie. I'm completing my B.A. in Computer Science (Expected May 2027) at the University of Virginia.",
		sections: {
			experience: 'Experience',
			projects: 'Projects',
			certifications: 'Certifications'
		},
		viewCV: 'View Full CV',
		viewAll: 'View All Projects',
		backToTop: 'Back to Top',
		footer: 'Code with joy using Svelte',
		exp: {
			prism: {
				date: 'APR 2026 — PRESENT',
				title: 'Research Assistant',
				company: 'UVA BAL Lab (Prof. Tong)',
				description:
					'Engineered PRISM, a constrained optimization framework for multivariate longitudinal missing data imputation: an initial imputation is projected onto the FIML model-implied mean and covariance structure under a regularized objective that counteracts the variance attenuation inherent in unconstrained imputation. Built the solver engine in C++17 (RcppArmadillo) as projected gradient descent with Armijo backtracking line search, exact mean-constraint enforcement via per-column zero-sum gradient projection, and KKT convergence certification.'
			},
			yale: {
				date: 'FEB 2026 — PRESENT',
				title: 'Research Assistant',
				company: "Yale (Liu's Group)",
				description:
					'Engineered a joint spectro-polarimetric forward model recovering a 324-channel scene datacube (spatial × 81 wavelengths × 4 Stokes channels) from a single multiplexed lensless speckle image. Formulated the reconstruction as a conic-constrained inverse problem mathematically isomorphic to quantum state tomography: the Poincaré-Bloch map S ↦ ρ = ½(I + S·σ) sends each Stokes vector to a single-qubit density matrix, and the enforced Lorentz cone constraint S₀ ≥ ‖S₁:₃‖ is precisely the density-matrix positivity condition ρ ⪰ 0. Architected a GPU-accelerated consensus ADMM solver in PyTorch with exact joint proximal operators and closed-form Sherman-Morrison inversions, scaling across SLURM HPC clusters.'
			},
			ke: {
				date: 'OCT 2025 — PRESENT',
				title: 'Research Assistant',
				company: "UVA (Ke's Group)",
				description:
					'Applied Density Functional Theory (DFT) to investigate transition-metal magnetic anisotropy and its relationship to structural motifs. Created immersive browser-based 3D atomic visualizations with Three.js and JSmol, and engineered a cloud-native machine learning pipeline in Go and Next.js for secure dataset sharing across collaborators. Designing RareEarth DB, a rare-earth-focused analogue of the Materials Project: a MongoDB document architecture linking 4,648 curated magnetic-anisotropy measurements to ICSD/Pearson crystal structures, with a schema designed for Fireworks-orchestrated DFT workflows on UVA HPC; DOE funding proposal in preparation.'
			},
			biocomplexity: {
				date: 'MAY 2026 — AUG 2026',
				title: 'Research Intern',
				company: 'UVA Biocomplexity Institute',
				description:
					'Formulated massive-scale network simulations modeling the stochastic spread of viral pathogens, implementing SEIR compartmental cascade models to capture heterogeneous transmission dynamics. Engineered Graph Neural Network (GNN) architectures utilizing spatiotemporal message-passing frameworks to extract predictive topological features from dynamic contact networks.'
			}
		},
		proj: {
			lensless: {
				title: 'lensless-recon — Conic-Constrained QST Solver',
				description:
					'GPU-accelerated consensus ADMM solver in PyTorch recovering a 324-channel spectro-polarimetric datacube from a single lensless speckle image. The conic-constrained inverse problem is isomorphic to quantum state tomography via the Poincaré-Bloch map, with the Lorentz cone constraint enforcing density-matrix positivity. Exact joint proximal operators and Sherman-Morrison closed-form inversions scale across SLURM HPC clusters.'
			},
			prism: {
				title: 'prism — Projected Gradient Imputation Engine',
				description:
					'A C++17 (RcppArmadillo) solver for multivariate longitudinal missing data imputation. Projected gradient descent with Armijo backtracking projects the imputation onto the FIML model-implied mean and covariance structure, with per-column zero-sum gradient projection enforcing mean constraints and KKT certification at every iterate.'
			},
			difi: {
				title: 'difi — Git Diff Review Tool',
				description:
					'A high-performance CLI tool built in Go for interactive Git diff reviews. Features a keyboard-centric Terminal User Interface (TUI) with a file tree and editor-aware navigation, allowing users to jump directly to specific lines in Neovim/Vim for rapid code refinement.'
			},
			stim: {
				title: 'stim — Quantum Circuit Simulator Contributor',
				description:
					'Authored a pull request to stim, the high-performance stabilizer circuit simulator used across the quantum error correction community, contributing to circuit rendering and execution frameworks.'
			},
			sanjaya: {
				title: 'sanjaya — Academic Graph Pipeline',
				description:
					'An automated academic literature extraction pipeline utilizing the OpenAlex Academic Graph API, Scrapy, and Playwright. Extracts bilingual data and exports structured CSV/JSON datasets for downstream interdisciplinary research applications.'
			},
			zsweep: {
				title: 'zsweep — Minesweeper with Vim Motions',
				description:
					'A terminal-based Minesweeper built around Vim-style keyboard motion — sweep the board with hjkl and marks, no mouse required.'
			},
			neovim: {
				title: 'Neovim — Contributor',
				description:
					'Contributed multiple Pull Requests to the Neovim core (C/Lua). Focused on Lua state change and ENV variable config supporting Vim logic.'
			}
		},
		cert: {
			ai: {
				title: 'AWS Certified AI Practitioner',
				issuer: 'Amazon Web Services',
				description:
					'Validated expertise in deploying production-grade AI solutions on AWS. Focused on prompt engineering, fine-tuning Foundation Models via Amazon Bedrock, and implementing low-latency inference pipelines for real-time financial data processing.'
			},
			cloud: {
				title: 'AWS Certified Cloud Practitioner',
				issuer: 'Amazon Web Services',
				description:
					'Mastery of the AWS Well-Architected Framework, emphasizing security, high availability, and performance efficiency. Architected cloud-native environments leveraging Amazon Aurora for relational data and EC2/Lambda for scalable compute logic.'
			},
			usaco: {
				title: 'USACO Silver Division',
				issuer: 'USA Computing Olympiad',
				description:
					'Competed in high-stakes algorithmic challenges focusing on computational efficiency and data structure optimization. Solved complex problems requiring O(n log n) performance using greedy algorithms, dynamic programming, and graph theory.'
			}
		},
		socials: 'Social media links',
		switchToLight: 'Switch to light theme',
		switchToDark: 'Switch to dark theme',
		langLabel: 'Switch language'
	},
	zh: {
		nav: {
			about: '关于',
			experience: '经历',
			projects: '项目'
		},
		tagline: '一个痴迷量子的计算机系学生',
		subtitle: '本科生研究者 · 量子计算 · 弗吉尼亚大学计算机系',
		about1:
			'我是弗吉尼亚大学计算机科学专业的本科生，研究方向处于量子信息与计算成像的交汇处：用带锥约束的 ADMM 求解器从无透镜散斑图像中重建光谱偏振数据立方体——该问题通过庞加莱-布洛赫映射与量子态层析在数学上同构；此外还有 PRISM（C++17 投影梯度下降引擎）和 RareEarth DB（基于 MongoDB 的材料数据库，在 UVA HPC 上运行 Fireworks 驱动的 DFT 工作流）。我也为量子电路模拟器 stim 贡献代码。',
		about2:
			'离开键盘之后，我练泰拳，也喜欢和我的喜乐蒂犬待在一起。我预计于 2027 年 5 月在弗吉尼亚大学取得计算机科学学士学位。',
		sections: {
			experience: '经历',
			projects: '项目',
			certifications: '证书'
		},
		viewCV: '查看完整简历',
		viewAll: '查看所有项目',
		backToTop: '回到顶部',
		footer: '开心地用 Svelte 写代码',
		exp: {
			prism: {
				date: '2026 年 4 月 — 至今',
				title: '研究助理',
				company: 'UVA BAL Lab（童教授课题组）',
				description:
					'开发 PRISM，一个面向多元纵向缺失数据插补的约束优化框架：将初始插补投影到 FIML 模型蕴含的均值和协方差结构上，并通过正则化目标函数抑制无约束条件期望插补固有的方差衰减。用 C++17（RcppArmadillo）构建求解器核心：带 Armijo 回溯线搜索的投影梯度下降、通过逐列零和梯度投影精确施加均值约束，以及每一步迭代计算逐列拉格朗日乘子估计的 KKT 收敛判定。'
			},
			yale: {
				date: '2026 年 2 月 — 至今',
				title: '研究助理',
				company: '耶鲁大学（Liu 课题组）',
				description:
					'构建联合光谱偏振前向模型，从单张复用无透镜散斑图像中恢复 324 通道场景数据立方体（空间 × 81 波长 × 4 斯托克斯通道）。将该重建问题形式化为与量子态层析数学同构的锥约束反问题：庞加莱-布洛赫映射 S ↦ ρ = ½(I + S·σ) 将每个斯托克斯向量映为单量子比特密度矩阵，重建中施加的洛伦兹锥约束 S₀ ≥ ‖S₁:₃‖ 恰为密度矩阵正定性条件 ρ ⪰ 0。在 PyTorch 中构建 GPU 加速的一致性 ADMM 求解器，使用精确联合近端算子与 Sherman-Morrison 闭式求逆，并在 SLURM HPC 集群上扩展大规模张量运算。'
			},
			ke: {
				date: '2025 年 10 月 — 至今',
				title: '研究助理',
				company: 'UVA（Ke 课题组）',
				description:
					'运用密度泛函理论（DFT）研究过渡金属磁各向异性及其与复杂晶格中结构基元的关系。用 Three.js 和 JSmol 制作沉浸式浏览器三维原子可视化，并用 Go 和 Next.js 搭建云原生机器学习流水线，供全球合作者安全共享数据集并运行量子材料性质预测模型。正在设计 RareEarth DB——一个以稀土为重点、对标 Materials Project 的数据库：MongoDB 文档架构将 4,648 条精选磁各向异性测量数据与 ICSD/Pearson 晶体结构关联，模式设计面向 UVA HPC 上由 Fireworks 编排的 DFT 工作流；DOE 基金申请正在准备中。'
			},
			biocomplexity: {
				date: '2026 年 5 月 — 2026 年 8 月',
				title: '研究实习生',
				company: 'UVA 生物复杂性研究所',
				description:
					'构建大规模网络仿真，动态建模病毒病原体的随机传播，实现 SEIR 仓室级联模型以刻画异质传播动力学。设计图神经网络（GNN）架构，利用时空消息传递框架从动态接触网络中提取预测性拓扑特征。'
			}
		},
		proj: {
			lensless: {
				title: 'lensless-recon — 锥约束 QST 求解器',
				description:
					'PyTorch 中 GPU 加速的一致性 ADMM 求解器，从单张无透镜散斑图像恢复 324 通道光谱偏振数据立方体。该锥约束反问题通过庞加莱-布洛赫映射与量子态层析同构，洛伦兹锥约束保证密度矩阵正定性。精确联合近端算子与 Sherman-Morrison 闭式求逆在 SLURM HPC 集群上扩展。'
			},
			prism: {
				title: 'prism — 投影梯度插补引擎',
				description:
					'面向多元纵向缺失数据插补的 C++17（RcppArmadillo）求解器。带 Armijo 回溯的投影梯度下降将插补结果投影到 FIML 模型蕴含的均值与协方差结构上，逐列零和梯度投影施加均值约束，每次迭代进行 KKT 收敛判定。'
			},
			difi: {
				title: 'difi — Git Diff 审查工具',
				description:
					'用 Go 编写的高性能命令行工具，用于交互式 Git diff 审查。提供以键盘为中心的终端界面（TUI），带文件树和编辑器感知导航，可一键跳转到 Neovim/Vim 中的具体行。'
			},
			stim: {
				title: 'stim — 量子电路模拟器贡献者',
				description:
					'向 stim 提交了拉取请求。stim 是量子纠错社区广泛使用的高性能稳定子电路模拟器，我贡献了电路渲染与执行框架相关代码。'
			},
			sanjaya: {
				title: 'sanjaya — 学术图谱流水线',
				description:
					'基于 OpenAlex Academic Graph API、Scrapy 和 Playwright 的学术文献自动提取流水线。提取双语数据并导出结构化 CSV/JSON 数据集，用于跨学科下游研究。'
			},
			zsweep: {
				title: 'zsweep — 带 Vim 键位的扫雷',
				description:
					'围绕 Vim 风格键盘操作构建的终端扫雷游戏——用 hjkl 和标记扫雷，无需鼠标。'
			},
			neovim: {
				title: 'Neovim — 贡献者',
				description:
					'向 Neovim 核心（C/Lua）提交了多个拉取请求。专注于 Lua 状态变更和 ENV 变量配置对 Vim 逻辑的支持。'
			}
		},
		cert: {
			ai: {
				title: 'AWS 认证 AI 从业者',
				issuer: 'Amazon Web Services',
				description:
					'验证了在 AWS 上部署生产级 AI 解决方案的能力。专注于提示工程、通过 Amazon Bedrock 微调基础模型，以及为实时金融数据处理实现低延迟推理流水线。'
			},
			cloud: {
				title: 'AWS 认证云从业者',
				issuer: 'Amazon Web Services',
				description:
					'掌握 AWS Well-Architected 框架，注重安全、高可用与性能效率。架构了云原生环境，使用 Amazon Aurora 存储关系数据，使用 EC2/Lambda 实现可扩展计算。'
			},
			usaco: {
				title: 'USACO 银组',
				issuer: '美国计算机奥林匹克竞赛',
				description:
					'参加高强度的算法竞赛，注重计算效率与数据结构优化。使用贪心算法、动态规划和图论解决需要 O(n log n) 性能的复杂问题。'
			}
		},
		socials: '社交媒体链接',
		switchToLight: '切换到日间主题',
		switchToDark: '切换到夜间主题',
		langLabel: '切换语言'
	}
};
