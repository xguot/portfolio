import { writable, derived, get } from 'svelte/store';

export type Lang = 'en' | 'zh';
type Dictionary = { [key: string]: string | Dictionary };
export const lang = writable<Lang>('en');

export function setLang(next: Lang) {
	lang.set(next);
	if (typeof document === 'undefined') return;
	document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
	try {
		localStorage.setItem('lang', next);
	} catch {
		/* Storage is optional. */
	}
}

export function initializeLanguage() {
	let saved: string | null = null;
	try {
		saved = localStorage.getItem('lang');
	} catch {
		/* Use browser language. */
	}
	setLang(
		saved === 'en' || saved === 'zh'
			? saved
			: navigator.language.toLowerCase().startsWith('zh')
				? 'zh'
				: 'en'
	);
}

export function toggleLang() {
	setLang(get(lang) === 'zh' ? 'en' : 'zh');
}

export const t = derived(lang, ($lang) => (key: string): string => {
	let value: string | Dictionary = dictionaries[$lang];
	for (const part of key.split('.')) {
		if (typeof value === 'string') return key;
		value = value[part] ?? key;
	}
	return typeof value === 'string' ? value : key;
});
export const isZh = derived(lang, ($lang) => $lang === 'zh');

const dictionaries: Record<Lang, Dictionary> = {
	en: {
		title: 'Xiyuan (Tommy) Guo · Quantum Error Correction',
		metaDescription:
			'Computer Science undergraduate at the University of Virginia studying quantum error correction, quantum LDPC decoding, and constrained optimization.',
		subtitle: 'Computer Science · University of Virginia',
		interests: 'Quantum error correction & constrained optimization',
		nav: {
			about: 'About',
			research: 'Research',
			experience: 'Experience',
			projects: 'Software',
			talks: 'Talks'
		},
		skip: 'Skip to content',
		navigation: 'On this page',
		viewCV: 'View CV',
		email: 'Email',
		about1:
			'I’m a Computer Science undergraduate at UVA working on quantum error correction and constrained optimization.',
		about2:
			'My work grew from constrained image reconstruction at Yale into quantum LDPC decoding. I’m interested in the guarantees and limits of optimization-based decoders under realistic noise.',
		sections: {
			research: 'Selected research',
			experience: 'Experience',
			projects: 'Selected software',
			talks: 'Talks',
			background: 'Education & honors'
		},
		methods: 'Methods & findings',
		method: 'Method',
		evaluation: 'Evaluation',
		finding: 'Finding',
		research: {
			qudec: {
				title: 'qudec · Quantum LDPC decoding',
				context: 'Independent research · Jul 2026–present',
				description:
					'LP and batched ADMM decoders for bivariate bicycle codes, evaluated against BP+OSD under increasingly realistic noise.',
				method:
					'Parity-polytope relaxations, with two-slice projection for batched PyTorch ADMM. Small-code checks use exhaustive minimum-weight baselines and LP objective comparisons.',
				evaluation:
					'LP: [[144,12,12]] under code-capacity noise. ADMM: [[72,12,6]] with time-expanded detectors under phenomenological noise, followed by circuit-level sweeps.',
				finding:
					'LLR normalization and penalty tuning strongly affected performance. Weighted ADMM improved one primary test cell, but showed no consistent advantage over BP+OSD across the broader sweep.'
			},
			lensless: {
				title: 'Constrained image reconstruction',
				context: 'Yale · Prof. Mengxia Liu’s group',
				description:
					'Recovering 81 spectral bands and four Stokes channels from a single lensless speckle image using physical constraints and sparsity priors.',
				method:
					'A consensus ADMM solver in PyTorch, combining spectral-sparsity proximal updates with projection onto the physically admissible Stokes cone; executed on Rivanna GPUs.',
				finding:
					'The coherency matrix connects polarization constraints to positive semidefiniteness. This work shaped my interest in how physical structure constrains inference from incomplete measurements.'
			},
			prism: {
				title: 'Covariance-constrained imputation',
				context: 'UVA BAL Lab · Prof. Xin Cynthia Tong',
				description:
					'PRISM adjusts missing-data imputations toward a model-implied covariance structure through constrained projection.',
				method:
					'A C++17/RcppArmadillo solver with projected gradient updates and first-order stationarity diagnostics. Supported by a $5,000 Double Hoo Research Grant.',
				finding:
					'In a separate exploratory three-qubit tomography study, random-forest imputation offered no benefit over a linear baseline; density-matrix projection enforced positivity and unit trace.'
			}
		},
		exp: {
			yale: {
				date: 'Feb 2026–present',
				title: 'Research Assistant',
				company: 'Yale · Mengxia Liu’s group'
			},
			prism: {
				date: 'Apr 2026–present',
				title: 'Research Assistant',
				company: 'UVA BAL Lab · Xin Cynthia Tong'
			},
			ke: {
				date: 'Oct 2025–present',
				title: 'Research Assistant',
				company: 'UVA · Liqin Ke’s group',
				description:
					'Built RareEarth DB, connecting 4,648 magnetic-anisotropy measurements with crystal structures for DFT research.'
			},
			biocomplexity: {
				date: 'May–Aug 2026',
				title: 'Research Intern',
				company: 'UVA Biocomplexity Institute · Abhijin Adiga',
				description:
					'Worked on LLM workflow planning, dependency-graph verification, and removal of redundant computation.'
			}
		},
		proj: {
			stim: {
				title: 'Stim',
				description:
					'Submitted PR #1099 to the quantum stabilizer circuit simulator. Under maintainer review.'
			},
			difi: {
				title: 'difi',
				description: 'A keyboard-driven Git diff review tool in Go, with editor-aware navigation.'
			},
			neovim: {
				title: 'Neovim',
				description:
					'Contributions to Lua state and environment-variable configuration in the editor’s core.'
			}
		},
		demo: 'Demo',
		discussion: 'HN discussion',
		viewAll: 'More on GitHub',
		talk: {
			title: 'Cyber Chat · Quantum computing & cryptography',
			description:
				'An introduction to quantum computation, reversible computing, and Shor’s algorithm.',
			short: '5-minute talk',
			extended: '15-minute version'
		},
		background: {
			degree: 'B.A. in Computer Science, UVA',
			graduation: 'Expected May 2027',
			course: 'Graduate Quantum Computing · PHYS 5880, Israel Klich',
			award: 'Double Hoo Research Grant · $5,000',
			awardDate: '2026'
		},
		about2a: 'AFK I do Muay Thai with my ',
		about2sheltie: 'sheltie',
		pet: 'Meet my sheltie',
		aboutName: 'the wellspring of hope.',
		backToTop: 'Back to top',
		footer: 'Built with Svelte',
		socials: 'Contact and profiles',
		langLabel: 'Switch to Chinese',
		appearance: 'Change website theme',
		themePicker: 'Theme picker',
		previousTheme: 'Previous theme',
		nextTheme: 'Next theme',
		useTheme: 'Use',
		showTheme: 'Show',
		themeInstructions: 'Arrow keys to browse, Enter to apply, Escape to close.',
		close: 'Close',
		lightThemes: 'Light',
		darkThemes: 'Dark'
	},
	zh: {
		title: '郭希源 (Tommy) · 量子纠错',
		metaDescription: '弗吉尼亚大学计算机科学本科生，研究量子纠错、量子 LDPC 解码与约束优化。',
		subtitle: '计算机科学 · 弗吉尼亚大学',
		interests: '量子纠错与约束优化',
		nav: { about: '关于', research: '研究', experience: '经历', projects: '软件', talks: '演讲' },
		skip: '跳至正文',
		navigation: '页面导航',
		viewCV: '查看简历',
		email: '邮件',
		about1: '我是弗吉尼亚大学计算机科学本科生，研究量子纠错与约束优化。',
		about2:
			'我的研究从耶鲁的约束图像重建延伸到量子 LDPC 解码。我关注优化解码器在真实噪声下的理论保证与局限。',
		sections: {
			research: '研究选集',
			experience: '研究经历',
			projects: '开源软件',
			talks: '演讲',
			background: '教育与荣誉'
		},
		methods: '方法与发现',
		method: '方法',
		evaluation: '评估',
		finding: '发现',
		research: {
			qudec: {
				title: 'qudec · 量子 LDPC 解码',
				context: '独立研究 · 2026 年 7 月至今',
				description:
					'面向双变量自行车码的 LP 与批量 ADMM 解码器，在逐步接近真实的噪声模型下与 BP+OSD 对比。',
				method:
					'基于校验多面体松弛，在批量 PyTorch ADMM 中采用双切片投影；以穷举最小重量基线和 LP 目标值验证小码行为。',
				evaluation:
					'LP：[[144,12,12]] 码的码容量噪声。ADMM：[[72,12,6]] 码的现象学噪声与时间展开探测器，随后开展电路级扫描。',
				finding:
					'LLR 归一化与罚参数调节显著影响性能。加权 ADMM 仅在一个主要测试单元中取得改进，在更广的扫描中未持续优于 BP+OSD。'
			},
			lensless: {
				title: '约束图像重建',
				context: '耶鲁大学 · Mengxia Liu 课题组',
				description:
					'结合物理约束与稀疏先验，从单幅无透镜散斑图像恢复 81 个波段、4 个 Stokes 通道。',
				method:
					'在 PyTorch 中构建共识 ADMM，结合光谱稀疏近端更新与物理可行 Stokes 锥投影，在 Rivanna GPU 集群执行。',
				finding:
					'相干矩阵将偏振约束与半正定性联系起来。这项工作促使我研究物理结构如何约束不完备测量下的推断。'
			},
			prism: {
				title: '协方差约束插补',
				context: 'UVA BAL 实验室 · Xin Cynthia Tong',
				description: 'PRISM 通过约束投影，将缺失数据插补结果调整至模型所要求的协方差结构。',
				method:
					'使用 C++17/RcppArmadillo、投影梯度更新和一阶驻点诊断。获 5,000 美元 Double Hoo 研究基金支持。',
				finding:
					'在另一项探索性的三量子比特层析研究中，随机森林插补未优于线性基线；密度矩阵投影则确保了半正定性与单位迹。'
			}
		},
		exp: {
			yale: {
				date: '2026 年 2 月至今',
				title: '研究助理',
				company: '耶鲁大学 · Mengxia Liu 课题组'
			},
			prism: {
				date: '2026 年 4 月至今',
				title: '研究助理',
				company: 'UVA BAL 实验室 · Xin Cynthia Tong'
			},
			ke: {
				date: '2025 年 10 月至今',
				title: '研究助理',
				company: 'UVA · Liqin Ke 课题组',
				description: '为 DFT 研究构建 RareEarth DB，将 4,648 条磁各向异性测量与晶体结构关联。'
			},
			biocomplexity: {
				date: '2026 年 5–8 月',
				title: '研究实习生',
				company: 'UVA 生物复杂性研究所 · Abhijin Adiga',
				description: '研究 LLM 工作流规划、依赖图验证及冗余计算消除。'
			}
		},
		proj: {
			stim: {
				title: 'Stim',
				description: '向量子稳定子电路模拟器提交 PR #1099，目前处于维护者审查阶段。'
			},
			difi: {
				title: 'difi',
				description: '以键盘操作为核心的 Go Git 差异审查工具，支持编辑器导航。'
			},
			neovim: { title: 'Neovim', description: '为编辑器核心的 Lua 状态与环境变量配置贡献代码。' }
		},
		demo: '演示',
		discussion: 'HN 讨论',
		viewAll: '更多 GitHub 项目',
		talk: {
			title: 'Cyber Chat · 量子计算与密码学',
			description: '介绍量子计算、可逆计算及 Shor 算法。',
			short: '5 分钟演讲',
			extended: '15 分钟版本'
		},
		background: {
			degree: '计算机科学学士 · 弗吉尼亚大学',
			graduation: '预计 2027 年 5 月毕业',
			course: '研究生量子计算 · PHYS 5880，Israel Klich',
			award: 'Double Hoo 研究基金 · 5,000 美元',
			awardDate: '2026 年'
		},
		about2a: '离开键盘之后，我练泰拳，和我的',
		about2sheltie: '喜乐蒂犬',
		pet: '看看我的喜乐蒂犬',
		aboutName: '希望之源泉。',
		backToTop: '回到顶部',
		footer: '使用 Svelte 构建',
		socials: '联系方式与个人主页',
		langLabel: 'Switch to English',
		appearance: '更换网站主题',
		themePicker: '主题选择器',
		previousTheme: '上一个主题',
		nextTheme: '下一个主题',
		useTheme: '应用',
		showTheme: '预览',
		themeInstructions: '方向键切换，回车应用，Esc 关闭。',
		close: '关闭',
		lightThemes: '浅色',
		darkThemes: '深色'
	}
};
