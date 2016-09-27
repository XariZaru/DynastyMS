/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.partyquest;

/**
 *
 * @author peter
 */
public enum PQRank {
    S,
    A,
    B,
    C,
    D,
    F,
    z; //z = undefined

    public static PQRank getPQRank(String rank) {
        rank = rank.toUpperCase();
        for (PQRank pqRank : PQRank.values()) {
            if (pqRank.name().equals(rank)) {
                return pqRank;
            }
        }
        return z;
    }
}
