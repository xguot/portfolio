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
			projects: 'projects',
			talks: 'talks'
		},
		subtitle: 'Quantum Computing · UVA Computer Science',
		about1:
			'I am a Computer Science student at UVA with a background in computational imaging and quantum information theory. Driven by my current graduate coursework in quantum computing, I am focused on bridging numerical methods with quantum theory to tackle foundational challenges in quantum computation.',
		about2a: 'AFK I do Muay Thai with my ',
		about2sheltie: 'sheltie',
		aboutName: 'the wellspring of hope.',
		sections: {
			experience: 'Experience',
			projects: 'Projects',
			talks: 'Talks',
			certifications: 'Certifications'
		},
		talks: {
			cyberchat: {
				title: 'Cyber Chat — The Quantum Threat and Post-Quantum Defense',
				description:
					"A compact talk on the quantum threat landscape, Landauer's principle, and reversible computation as the road to post-quantum defense.",
				watch: 'Watch (5 min)'
			},
			extended: {
				title: 'Cyber Chat Extended — Thermodynamics, Matrices, and the Collapse of RSA',
				description:
					"The extended version: the thermodynamics of computation, matrix mechanics, and how RSA collapses under Shor's algorithm.",
				watch: 'Watch (15 min)'
			}
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
					'PRISM: C++17 projected-gradient solver for longitudinal-data imputation, with mean constraints, covariance-target regularization, and first-order stationarity diagnostics.'
			},
			yale: {
				date: 'FEB 2026 — PRESENT',
				title: 'Research Assistant',
				company: "Yale (Prof. Liu's Group)",
				description:
					'GPU-accelerated ADMM for lensless spectro-polarimetric reconstruction, with physical cone constraints that share a positive-semidefinite structure with quantum-state reconstruction.'
			},
			ke: {
				date: 'OCT 2025 — PRESENT',
				title: 'Research Assistant',
				company: "UVA (Prof. Ke's Group)",
				description:
					'DFT calculations for rare-earth magnetic anisotropy; designed the schema, API, and web interface for RareEarth DB, linking 4,648 measurements to crystal structures.'
			},
			biocomplexity: {
				date: 'MAY 2026 — AUG 2026',
				title: 'Research Intern',
				company: 'UVA Biocomplexity Institute',
				description:
					'Built a Julia Independent Cascade simulator and PyTorch Geometric graph convolutional networks for cascade-size estimation from sparse observations; developed a workflow prototype with DAG validation and deduplication.'
			}
		},
		proj: {
			lensless: {
				title: 'lensless-recon — Spectro-Polarimetric Imaging Solver',
				description:
					'GPU-accelerated ADMM for estimating an 81-band, four-Stokes datacube from a lensless speckle image under physical cone constraints and spectral-sparsity priors.'
			},
			prism: {
				title: 'prism — Projected Gradient Imputation Engine',
				description:
					'C++17 (RcppArmadillo) imputation solver using projected gradient descent, FIML mean constraints, covariance-target regularization, and first-order stationarity diagnostics.'
			},
			difi: {
				title: 'difi — Git Diff Review Tool',
				description:
					'A keyboard-centric Go CLI for interactive Git diff reviews with editor-aware navigation.'
			},
			stim: {
				title: 'stim — Quantum Simulator Pull Request',
				description:
					'Submitted pull request #1099 to Stim, Google\'s open-source quantum stabilizer circuit simulator; under maintainer review.'
			},
			qudec: {
				title: 'qudec — Quantum LDPC Decoding Toolkit',
				description:
					'LP and batched PyTorch ADMM decoders for quantum LDPC codes: LP evaluated under code-capacity noise and ADMM variants under phenomenological noise, with BP+OSD comparisons on bivariate bicycle codes.'
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
					'Foundational AWS certification in artificial intelligence, machine learning, and generative AI concepts and use cases.'
			},
			cloud: {
				title: 'AWS Certified Cloud Practitioner',
				issuer: 'Amazon Web Services',
				description:
					'Foundational AWS certification in cloud concepts, services, and terminology.'
			},
			usaco: {
				title: 'USACO Silver Division',
				issuer: 'USA Computing Olympiad',
				description:
					'Competed in the USACO Silver division, developing algorithmic problem-solving skills.'
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
			projects: '项目',
			talks: '讲座'
		},
		subtitle: '量子计算 · 弗吉尼亚大学计算机科学',
		about1:
			'我是弗吉尼亚大学计算机科学专业的学生，拥有计算成像与量子信息理论的背景。在目前量子计算研究生课程的推动下，我致力于将数值方法与量子理论相结合，以攻克量子计算中的基础性挑战。',
		about2a: '离开键盘之后，我练泰拳，和我的',
		about2sheltie: '喜乐蒂犬',
		aboutName: '希望之源泉。',
		sections: {
			experience: '经历',
			projects: '项目',
			talks: '讲座',
			certifications: '证书'
		},
		talks: {
			cyberchat: {
				title: 'Cyber Chat — 量子威胁与后量子防御',
				description: '量子威胁格局速览：兰道尔原理、可逆计算，以及通往后量子防御之路。',
				watch: '观看（5 分钟）'
			},
			extended: {
				title: 'Cyber Chat Extended — 热力学、矩阵与 RSA 的崩塌',
				description: '加长版：计算热力学、矩阵力学，以及 RSA 如何在 Shor 算法面前崩塌。',
				watch: '观看（15 分钟）'
			}
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
				description: 'PRISM：面向纵向缺失数据的 C++17 投影梯度插补求解器，包含均值约束、协方差目标正则化和一阶驻点诊断。'
			},
			yale: {
				date: '2026 年 2 月 — 至今',
				title: '研究助理',
				company: '耶鲁大学（Liu 教授课题组）',
				description: 'GPU 加速的 ADMM 无透镜光谱偏振重建，采用与量子态重建共享半正定结构的物理锥约束。'
			},
			ke: {
				date: '2025 年 10 月 — 至今',
				title: '研究助理',
				company: 'UVA（Ke 教授课题组）',
				description:
					'开展稀土磁各向异性的 DFT 计算；设计 RareEarth DB 的数据库结构、API 和网页界面，将 4,648 条测量记录与晶体结构关联。'
			},
			biocomplexity: {
				date: '2026 年 5 月 — 2026 年 8 月',
				title: '研究实习生',
				company: 'UVA 生物复杂性研究所',
				description: '构建 Julia 独立级联模拟器与 PyTorch Geometric 图卷积网络，从稀疏观测估计级联规模；开发带执行 DAG 验证与去重的工作流原型。'
			}
		},
		proj: {
			lensless: {
				title: 'lensless-recon — 光谱偏振成像求解器',
				description:
					'GPU 加速的 ADMM 求解器，在物理锥约束与光谱稀疏先验下，从无透镜散斑图像估计 81 波段、4 个 Stokes 分量的数据立方体。'
			},
			prism: {
				title: 'prism — 投影梯度插补引擎',
				description:
					'C++17（RcppArmadillo）插补求解器，采用投影梯度下降、FIML 均值约束、协方差目标正则化和一阶驻点诊断。'
			},
			difi: {
				title: 'difi — Git Diff 审查工具',
				description: '以键盘为中心的 Go 命令行工具，用于交互式 Git diff 审查，支持编辑器感知导航。'
			},
			stim: {
				title: 'stim — 量子模拟器拉取请求',
				description: '向 Google 开源量子稳定子电路模拟器 Stim 提交拉取请求 #1099，目前处于维护者审查阶段。'
			},
			qudec: {
				title: 'qudec — 量子 LDPC 解码工具包',
				description:
					'面向量子 LDPC 码的 LP 与批量 PyTorch ADMM 解码器：在码容量噪声下评估 LP，在现象学噪声下评估 ADMM 变体，并在双变量自行车码上与 BP+OSD 对比。'
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
					'AWS 基础级认证，涵盖人工智能、机器学习与生成式 AI 的概念和应用场景。'
			},
			cloud: {
				title: 'AWS 认证云从业者',
				issuer: 'Amazon Web Services',
				description:
					'AWS 基础级认证，涵盖云计算概念、服务与术语。'
			},
			usaco: {
				title: 'USACO 银组',
				issuer: '美国计算机奥林匹克竞赛',
				description:
					'参加 USACO 银组竞赛，培养算法分析与问题求解能力。'
			}
		},
		socials: '社交媒体链接',
		switchToLight: '切换到日间主题',
		switchToDark: '切换到夜间主题',
		langLabel: '切换语言'
	}
};
