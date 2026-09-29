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
			"I'm a CS undergrad at UVA working at the intersection of quantum information and computational imaging — reconstructing spectro-polarimetric datacubes from lensless speckle images with a conic-constrained ADMM solver, a problem formally isomorphic to quantum state tomography via the Poincaré-Bloch map.",
		about2a: 'AFK I do Muay Thai and hang out with my ',
		about2sheltie: 'Sheltie',
		about2b:
			". I'm completing my B.A. in Computer Science (Expected May 2027) at the University of Virginia.",
		aboutName: 'hope, and the wellspring whence all things flow.',
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
					'PRISM: C++17 projected-gradient-descent engine for multivariate longitudinal missing data, with KKT convergence certification.'
			},
			yale: {
				date: 'FEB 2026 — PRESENT',
				title: 'Research Assistant',
				company: "Yale (Prof. Liu's Group)",
				description:
					'GPU-accelerated conic-constrained ADMM for lensless spectro-polarimetric reconstruction — a problem formally isomorphic to quantum state tomography.'
			},
			ke: {
				date: 'OCT 2025 — PRESENT',
				title: 'Research Assistant',
				company: "UVA (Prof. Ke's Group)",
				description:
					'DFT for rare-earth magnetic anisotropy; designing RareEarth DB, a MongoDB + Fireworks materials database on UVA HPC.'
			},
			biocomplexity: {
				date: 'MAY 2026 — AUG 2026',
				title: 'Research Intern',
				company: 'UVA Biocomplexity Institute',
				description:
					'SEIR epidemic simulations and graph neural networks for viral spread prediction on large contact networks.'
			}
		},
		proj: {
			lensless: {
				title: 'lensless-recon — Conic-Constrained QST Solver',
				description:
					'GPU-accelerated ADMM solver recovering a 324-channel spectro-polarimetric datacube from a single lensless speckle image — a problem isomorphic to quantum state tomography via the Poincaré-Bloch map.'
			},
			prism: {
				title: 'prism — Projected Gradient Imputation Engine',
				description:
					'C++17 (RcppArmadillo) solver projecting longitudinal missing data onto the FIML mean and covariance structure, with KKT-certified projected gradient descent.'
			},
			difi: {
				title: 'difi — Git Diff Review Tool',
				description:
					'A keyboard-centric Go CLI for interactive Git diff reviews with editor-aware navigation.'
			},
			stim: {
				title: 'stim — Quantum Circuit Simulator Contributor',
				description:
					'Contributed to the high-performance stabilizer circuit simulator used across the quantum error correction community.'
			},
			sanjaya: {
				title: 'sanjaya — Academic Graph Pipeline',
				description:
					'Automated academic literature extraction via the OpenAlex Academic Graph API, Scrapy, and Playwright.'
			},
			zsweep: {
				title: 'zsweep — Minesweeper with Vim Motions',
				description: 'A terminal-based Minesweeper played entirely with Vim-style keyboard motions.'
			},
			neovim: {
				title: 'Neovim — Contributor',
				description:
					'Multiple pull requests to the Neovim core, focused on Lua state and ENV variable configuration.'
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
			'我是弗吉尼亚大学计算机科学专业的本科生，研究方向处于量子信息与计算成像的交汇处：用带锥约束的 ADMM 求解器从无透镜散斑图像中重建光谱偏振数据立方体，该问题通过庞加莱-布洛赫映射与量子态层析在数学上同构。',
		about2a: '离开键盘之后，我练泰拳，也喜欢和我的',
		about2sheltie: '喜乐蒂犬',
		about2b: '待在一起。我预计于 2027 年 5 月在弗吉尼亚大学取得计算机科学学士学位。',
		aboutName: '希望，与万物所自之源泉。',
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
				company: 'UVA BAL Lab（Tong 教授课题组）',
				description: 'PRISM：面向多元纵向缺失数据的 C++17 投影梯度下降引擎，带 KKT 收敛判定。'
			},
			yale: {
				date: '2026 年 2 月 — 至今',
				title: '研究助理',
				company: '耶鲁大学（Liu 教授课题组）',
				description: 'GPU 加速的锥约束 ADMM 无透镜光谱偏振重建——该问题与量子态层析在数学上同构。'
			},
			ke: {
				date: '2025 年 10 月 — 至今',
				title: '研究助理',
				company: 'UVA（Ke 教授课题组）',
				description:
					'稀土磁各向异性的 DFT 计算；设计 RareEarth DB——基于 MongoDB 与 Fireworks 的 UVA HPC 材料数据库。'
			},
			biocomplexity: {
				date: '2026 年 5 月 — 2026 年 8 月',
				title: '研究实习生',
				company: 'UVA 生物复杂性研究所',
				description: '在大规模接触网络上进行 SEIR 流行病仿真，并用图神经网络预测病毒传播。'
			}
		},
		proj: {
			lensless: {
				title: 'lensless-recon — 锥约束 QST 求解器',
				description:
					'GPU 加速的 ADMM 求解器，从单张无透镜散斑图像恢复 324 通道光谱偏振数据立方体，该问题通过庞加莱-布洛赫映射与量子态层析同构。'
			},
			prism: {
				title: 'prism — 投影梯度插补引擎',
				description:
					'C++17（RcppArmadillo）求解器，将纵向缺失数据投影到 FIML 均值与协方差结构上，采用带 KKT 收敛判定的投影梯度下降。'
			},
			difi: {
				title: 'difi — Git Diff 审查工具',
				description: '以键盘为中心的 Go 命令行工具，用于交互式 Git diff 审查，支持编辑器感知导航。'
			},
			stim: {
				title: 'stim — 量子电路模拟器贡献者',
				description: '为量子纠错社区广泛使用的高性能稳定子电路模拟器贡献代码。'
			},
			sanjaya: {
				title: 'sanjaya — 学术图谱流水线',
				description:
					'基于 OpenAlex Academic Graph API、Scrapy 和 Playwright 的学术文献自动提取流水线。'
			},
			zsweep: {
				title: 'zsweep — 带 Vim 键位的扫雷',
				description: '完全用 Vim 风格键盘操作游玩的终端扫雷游戏。'
			},
			neovim: {
				title: 'Neovim — 贡献者',
				description: '向 Neovim 核心提交多个拉取请求，专注于 Lua 状态与 ENV 变量配置。'
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
