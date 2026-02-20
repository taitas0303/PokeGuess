import React from 'react';
import { ChevronUp, ChevronDown, Check, X } from 'lucide-react';
import { typeTranslations } from '../utils/constants';

const ResultTable = ({ guesses, target }) => {
    if (guesses.length === 0) return null;

    const compareStat = (val, targetVal) => {
        if (val === targetVal) return { color: 'var(--match-color)', icon: <Check size={16} /> };
        return {
            color: 'var(--wrong-color)',
            icon: val < targetVal ? <ChevronUp size={16} /> : <ChevronDown size={16} />
        };
    };

    const compareTypes = (types, targetTypes) => {
        const matches = types.filter(t => targetTypes.includes(t));
        if (matches.length === targetTypes.length && types.length === targetTypes.length) {
            return { color: 'var(--match-color)', content: types.map(t => typeTranslations[t]).join(' / ') };
        }
        if (matches.length > 0) {
            return { color: 'var(--partial-color)', content: types.map(t => typeTranslations[t]).join(' / ') };
        }
        return { color: 'var(--wrong-color)', content: types.map(t => typeTranslations[t]).join(' / ') };
    };

    const calculateRange = (statName) => {
        let min = 1;
        let max = 999;

        guesses.forEach(g => {
            const val = statName === 'generation' ? g.generation : g.stats[statName];
            const targetVal = statName === 'generation' ? target.generation : target.stats[statName];

            if (val === targetVal) {
                min = Math.max(min, val);
                max = Math.min(max, val);
            } else if (val < targetVal) {
                min = Math.max(min, val + 1);
            } else {
                max = Math.min(max, val - 1);
            }
        });

        if (min === max) return `${min}`;
        return `${min} 〜 ${max === 999 ? '?' : max}`;
    };

    const statsKeys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe', 'total'];

    return (
        <div className="table-responsive">
            <table className="result-table">
                <thead>
                    <tr>
                        <th>ポケモン</th>
                        <th>タイプ</th>
                        <th>世代</th>
                        {statsKeys.map(key => (
                            <th key={key}>{key === 'spa' ? '特攻' : key === 'spd' ? '特防' : key === 'spe' ? '素早' : key === 'total' ? '合計' : key.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="range-row" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', fontWeight: 'bold' }}>
                        <td colSpan={2} style={{ textAlign: 'center' }}>範囲推定</td>
                        <td style={{ color: 'var(--primary-color)' }}>{calculateRange('generation')}</td>
                        {statsKeys.map(key => (
                            <td key={key} style={{ color: 'var(--primary-color)' }}>{calculateRange(key)}</td>
                        ))}
                    </tr>
                    {[...guesses].reverse().map((g, sliceIndex) => (
                        <tr key={sliceIndex}>
                            <td>
                                <div className="pokemon-cell">
                                    <img src={g.image} alt={g.jaName} width={40} />
                                    <span>{g.jaName}</span>
                                </div>
                            </td>
                            <td style={{ backgroundColor: compareTypes(g.types, target.types).color }}>
                                {compareTypes(g.types, target.types).content}
                            </td>
                            <td style={{ backgroundColor: g.generation === target.generation ? 'var(--match-color)' : 'var(--wrong-color)' }}>
                                {g.generation} {g.generation !== target.generation && (g.generation < target.generation ? '↑' : '↓')}
                            </td>
                            <td style={{ backgroundColor: compareStat(g.stats.hp, target.stats.hp).color }}>
                                {g.stats.hp} {compareStat(g.stats.hp, target.stats.hp).icon}
                            </td>
                            <td style={{ backgroundColor: compareStat(g.stats.atk, target.stats.atk).color }}>
                                {g.stats.atk} {compareStat(g.stats.atk, target.stats.atk).icon}
                            </td>
                            <td style={{ backgroundColor: compareStat(g.stats.def, target.stats.def).color }}>
                                {g.stats.def} {compareStat(g.stats.def, target.stats.def).icon}
                            </td>
                            <td style={{ backgroundColor: compareStat(g.stats.spa, target.stats.spa).color }}>
                                {g.stats.spa} {compareStat(g.stats.spa, target.stats.spa).icon}
                            </td>
                            <td style={{ backgroundColor: compareStat(g.stats.spd, target.stats.spd).color }}>
                                {g.stats.spd} {compareStat(g.stats.spd, target.stats.spd).icon}
                            </td>
                            <td style={{ backgroundColor: compareStat(g.stats.spe, target.stats.spe).color }}>
                                {g.stats.spe} {compareStat(g.stats.spe, target.stats.spe).icon}
                            </td>
                            <td style={{ backgroundColor: compareStat(g.stats.total, target.stats.total).color }}>
                                {g.stats.total} {compareStat(g.stats.total, target.stats.total).icon}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
