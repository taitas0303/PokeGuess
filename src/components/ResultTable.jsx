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

    return (
        <div className="table-responsive">
            <table className="result-table">
                <thead>
                    <tr>
                        <th>ポケモン</th>
                        <th>タイプ</th>
                        <th>世代</th>
                        <th>HP</th>
                        <th>攻撃</th>
                        <th>防御</th>
                        <th>特攻</th>
                        <th>特防</th>
                        <th>素早</th>
                        <th>合計</th>
                    </tr>
                </thead>
                <tbody>
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
